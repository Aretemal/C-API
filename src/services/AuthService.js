import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { generationAccessToken } from '../utils/generationAccessToken.js';
import connection, {orm} from '../../db.js';

dotenv.config();
const findUserByLogin = (login, next) => {
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM users where login=? ', [login],  (error, results)=>{
            if(error){
                return reject(error);
            }
            if (results.length) {
                return resolve(results[0]);
            } else {
                return resolve(null);
            }
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    });
}
const addNewUser = ({ login, firstName, lastName, hashPassword, email }, next) => {
    return new Promise((resolve, reject)=> {
    connection.query(`
        insert into users(login, firstName, lastName, password, email) 
        values (?, ?, ?, ?, ?);
        `, [login, firstName, lastName, hashPassword, email],
        function (error, results, fields) {
            if (error){
                return reject(error);
            } else {
                return resolve(true);
            }
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    })
}
class AuthService {
  async registration({
      login, password, firstName, lastName, email }, next,
  ) {
    connection.connect();
    const candidate = await findUserByLogin(login, next);
    if (candidate) {
        next({errorsArray: [{msg: 'User already exists'}]});
        return;
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const isUserCreated = await addNewUser({
        login, firstName, lastName, hashPassword, email
    }, next);
    if (isUserCreated){
        const user = await findUserByLogin(login);
        const token = generationAccessToken(user.id);
        return {token, id: user.id, login};
    }
  }

  async login({ login, password }, next) {
      connection.connect();
      const user = await findUserByLogin(login, next);
    if (!user) {
      next({ errorsArray: [{ msg: 'Login or password is incorrect' }] });
      return;
    }
    // const a = await orm.findAll({ login }, next)
    // console.log(a);
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      next({ errorsArray: [{ msg: 'Login or password is incorrect' }] });
      return;
    }
    const token = generationAccessToken(user.id);
    return { token, id: user.id, login: user.login };
  }
}

export default new AuthService();
