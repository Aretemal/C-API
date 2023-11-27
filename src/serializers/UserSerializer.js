import Serializer from './Serializer.js';

class UserSerializer extends Serializer {
  type() {
    return 'User';
  }

  attributes() {
    return {
      firstName: this.resource.firstName,
      lastName: this.resource.lastName,
      login: this.resource.login,
      email: this.resource.email,
      balance: this.resource.balance,
      role: this.resource.role,
      banned: this.resource.banned,
      created: this.resource?.created_at,
    };
  }

  links() {
    return { self: `http://localhost:5000/api/profile/user/${this.resource.id}` };
  }
}
export default UserSerializer;
