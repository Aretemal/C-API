import ORM from '../../orm.js';

class PaymentsService {
    async updateBalance({ userId, amount }, next) {
        const [ { balance: oldBalance } ] =  await ORM.findAll(
            { id: userId },
            { table: 'users'},
            next);
        const updatedUser = await ORM.update(
            { balance: +oldBalance + +amount },
            { table: 'users', where: { id: userId } },
            next);
        const [ { balance } ] =  await ORM.findAll(
            { id: userId },
            { table: 'users'},
            next);
        const createdPayment = await ORM.create(
            { userId, amount, newBalance: balance },
            { table: 'payments' },
            next)
        return { id: userId, balance };
    }

    async getBalance({ userId }, next) {
        let [ { balance }] = await ORM.findAll({ id: userId },
            { table: 'users'},  next);
        return { id: userId, balance };
    }

    async getHistoryOfPayments({ userId }, next) {
        const payments = await ORM.findAll( { userId }, { table: 'payments' }, next);
        return payments;
    }
}

export default new PaymentsService();
