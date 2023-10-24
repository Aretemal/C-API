import connection from '../../db.js';

const updateCasinoBalance = ({ amount }, next) => {
    return new Promise((resolve, reject)=>{
        connection.query('Update casinoBalance Set balance = balance + ? where id=1', [amount],
            (error, results)=> {
            if (error){
                return reject(error);
            }
            resolve(true);
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    });
}
const updateUserBalance = ({ amount, userId}, next) => {
    return new Promise((resolve, reject)=>{
        connection.query('Update users Set balance = balance + ? where id=?', [amount, userId],
            (error, results)=> {
            if (error){
                return reject(error);
            }
            resolve(true);
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    });
}
const updateUserAmount = ({ amount, userId }, next) => {
    return new Promise((resolve, reject)=>{
        connection.query(`insert into payments(amount, userId) values (?, ?)`, [amount, userId],
            (error, results)=> {
            if (error){
                return reject(error);
            }
            resolve(true);
        });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    });
}
const getUserBalance = ({ userId }, next) => {
    return new Promise((resolve, reject)=>{
        connection.query(`select balance from users where id=?`, [userId],
            (error, results)=> {
                if (error){
                    return reject(error);
                }
                resolve(results[0].balance);
            });
    }).catch((error) => {
        console.log(error);
        next({errorsArray: [{ msg: 'Error in DB' }]});
    });
}
class PaymentsService {
    async updateBalance({ userId, amount }, next) {
        let balance;
        const isUpdatedUserBalance = await updateUserAmount( { userId, amount }, next);
        if (isUpdatedUserBalance) {
            const isUpdatedCasinoBalance = await updateCasinoBalance( { amount }, next);
            await updateUserBalance({ userId, amount }, next)
            if (isUpdatedCasinoBalance) {
                balance =  await getUserBalance({ userId }, next);
            }
        }
        return { id: userId, balance };
    }

    async getBalance({ userId }, next) {
        let balance = await getUserBalance({ userId }, next);
        return { id: userId, balance };
    }
}

export default new PaymentsService();
