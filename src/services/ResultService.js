import ORM from '../../orm.js';
import * as dotenv from 'dotenv';
import connection from '../../db.js';

dotenv.config();
class ResultService {
  async roulette({ userId, selectedNumber, game, amount }, next) {
      const result = Math.floor(Math.random() * 37 );
      console.log( userId, selectedNumber, game, amount )
      const addedResult = await ORM.create(
          { selected: selectedNumber, result, game, amount: +amount, userId: userId },
          { table: 'rouletteResults' },
          next);
      return { result, id: addedResult.insertId, selected: selectedNumber, game, amount };
  }
}

export default new ResultService();
