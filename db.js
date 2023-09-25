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
export default connection;
