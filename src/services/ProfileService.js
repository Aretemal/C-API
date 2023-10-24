import connection from '../../db.js';

const findUserById = (id, next) => {
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM users where id=? ', [id],  (error, results)=>{
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
class ProfileService {
    async getInfoAuthorizedUser(userId, next) {
        if (!userId) {
            next({ errorsArray: [{ msg: 'Id not specified' }] });
            return;
        }
        const user = await findUserById(userId, next);
        const {
            id, login, firstName, lastName, email,
        } = user;
        return {
            id, login, firstName, lastName, email,
        };
    }
}

export default new ProfileService();
