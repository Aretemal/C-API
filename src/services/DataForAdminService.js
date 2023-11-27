import ORM from '../../orm.js';

class DataForAdminService {
    async getUsers({ filter, page, size }, next) {
        const offset = filter?.offset || 0;
        const limit = size || 10;
        const users = await ORM.findAll( {}, { table: 'users', offset, limit }, next);
        return users;
    }

    async updateUser({ id }, data, next) {
        const user = await ORM.update( { ...data }, { table: 'users', where: { id }, }, next);
        return user;
    }

    async getPayments({ id }, next) {
        const params = {};
        if (id !== 'undefined') params.userId = id;
        const payments = await ORM.findAll(params, { table: 'payments' }, next);
        return payments;
    }

    async getResults({ id }, next) {
        const rouletteResults = await ORM.findAll( params, { table: 'rouletteResults' }, next);
        return rouletteResults;
    }
}

export default new DataForAdminService();
