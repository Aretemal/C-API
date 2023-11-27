import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { generationAccessToken } from '../utils/generationAccessToken.js';
import ORM from '../../orm.js';

dotenv.config();

class AuthService {
  async registration({
      login, password, firstName, lastName, email }, next,
  ) {
      const candidate = await ORM.findAll({ login },
          { table: 'users' }, next);
      if (candidate.length > 0) {
          next({ errorsArray: [{ msg: 'User already exists' }] });
          return;
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const { insertId } = await ORM.create({
          login, firstName, lastName, password: hashPassword, email
      }, { table: 'users' }, next)
      if (insertId) {
          const token = generationAccessToken(insertId);
          return { token, id: insertId, login };
      }
  }

  async login({ login, password }, next) {
    const [ user ] = await ORM.findAll({ login }, { table: 'users' }, next);
    if (!user) {
      next({ errorsArray: [{ msg: 'Login or password is incorrect' }] });
      return;
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      next({ errorsArray: [{ msg: 'Login or password is incorrect' }] });
      return;
    }
    const token = generationAccessToken(user.id);
    return { token, id: user.id, login: user.login, role: user.role };
  }
}

export default new AuthService();
