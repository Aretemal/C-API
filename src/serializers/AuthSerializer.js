import Serializer from './Serializer.js';

class AuthSerializer extends Serializer {
  type() {
    return 'Token';
  }

  attributes() {
    return {
      token: this.resource.token,
      login: this.resource.login,
      role: this.resource.role,
    };
  }

  links() {
    return { self: `http://localhost:5000/api/${this.options.url || 'auth'}` };
  }
}
export default AuthSerializer;
