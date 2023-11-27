import pool from "./db.js";

class Orm {
    constructor(props) {}
    async findAll(params, options, next) {
        return new Promise((resolve)=> {
            let str = `SELECT * FROM ${options.table} `;
            if (Object.entries(params).length > 0) {
                str += ` where ${Object.entries(params).map(([key, value], index) => `${key}='${value}'`).join(' AND ')} `
            }
            if (options?.limit) {
                str += `LIMIT ${options?.limit}`
            }
            console.log(str)
            pool.query(str, (error, results) => {
                if (error) {
                    next({errorsArray: [{ msg: 'Error in DB' }]});
                }
                return resolve(results);
            });
        })
    }
    async create(params, options, next) {
        return new Promise((resolve)=> {
            let str = `
            insert into ${options.table} (${Object.keys(params).join(',')}) 
            values (${Object.values(params).map(el => `'${el}'`).join(',')})`;
            console.log(str)
            pool.query(str, (error, results) => {
                if (error) {
                    next({errorsArray: [{ msg: 'Error in DB' }]});
                }
                return resolve(results)
            });
        })
    }
    async update(params, options, next) {
        return new Promise((resolve)=> {
            let str = `UPDATE ${options.table}
                SET ${Object.entries(params).map(([key, value], index) => typeof value === 'string' ? `${key}='${value}'` : `${key}=${value}`).join(',')}
                WHERE ${Object.entries(options.where).map(([key, value], index) => typeof value === 'string' ? `${key}='${value}'` : `${key}=${value}`).join(' AND ')}`;
            console.log(str)
            pool.query(str, (error, results) => {
                if (error) {
                    next({errorsArray: [{ msg: 'Error in DB' }]});
                }
                return resolve(results)
            });
        })
    }
}
export default new Orm();