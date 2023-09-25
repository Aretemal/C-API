import AuthService from '../services/AuthService.js';
import AuthSerializer from '../serializers/AuthSerializer.js';

class AuthController {
  async registration(req, res, next) {
    const token = await AuthService.registration(req.body, next);
    req.serializer = new AuthSerializer(token, { url: 'registration'});
    next();
  }

  async login(req, res, next) {
    const token = await AuthService.login(req.body, next);
    req.serializer = new AuthSerializer(token, { url: 'registration'});
    next();
  }
}

export default new AuthController();
