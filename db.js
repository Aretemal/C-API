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
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'database_casino_dev',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
export default pool;
