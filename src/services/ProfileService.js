import ORM from '../../orm.js';

class ProfileService {
    async getInfoAuthorizedUser(userId, next) {
        if (!userId) {
            next({ errorsArray: [{ msg: 'Id not specified' }] });
            return;
        }
        const [user] = await ORM.findAll( { id: userId }, { table: 'users'}, next);
        const {
            id, login, firstName, lastName, email,
        } = user;
        return {
            id, login, firstName, lastName, email,
        };
    }
}

export default new ProfileService();
