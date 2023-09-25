import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { generationAccessToken } from '../utils/generationAccessToken.js';
import connection from '../../db.js';

dotenv.config();
const addRouletteResult = (result, next) => {
    return new Promise((resolve, reject)=> {
    connection.query(`insert into rouletteResults(result) values (?);`, [result],
        function (error) {
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
const getIdOfGames = (result, next) => {
    return new Promise((resolve, reject)=> {
    connection.query(`SELECT MAX(id) FROM rouletteResults`, [],
        function (error, results) {
            if (error){
                return reject(error);
            } else {
                return resolve(results[0].id);
            }
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    })
}
class ResultService {
  async roulette(selectedNumber, next) {
      connection.connect();
      const result = Math.floor(Math.random() * 37);
      const isAdd = await addRouletteResult(result, next);
      if (isAdd){
          const id = await getIdOfGames()
          return { result, id, isWin: +selectedNumber === +result };
      } else {
          return { result: null, id: null, isWin: null }
      }
  }
}

export default new ResultService();
