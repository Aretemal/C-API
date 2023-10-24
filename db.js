import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();
const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'database_casino_dev',
    port: '3306'
});

class ORM {
    constructor(props) {
        connection.connect();
    }
    async findAll(params, next) {
        try {
            let str = 'SELECT * FROM users where ';
            const arrParams = Object.entries(params);
            arrParams.forEach(([key, value], index) => {
                if (index === arrParams.length) {
                    str += `${key}=${value}`;
                    return;
                }
                str += `${key}=${value} AND `
            })
            await connection.query(str, (error, results) => {
                if (error) {
                    console.log(error);
                    next({errorsArray: [{ msg: 'Error in DB' }]});
                }
                return results;
            });
        } catch (error) {
            console.log(error);
            next({errorsArray: [{ msg: 'Error in DB' }]});
        }
    }

}
export const orm = new ORM();
// export default new ORM();
export default connection;
