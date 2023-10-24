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
    };
  }

  links() {
    return { self: `${process.env.API_URL}/profile/user/${this.resource.id}` };
  }
}
export default UserSerializer;
