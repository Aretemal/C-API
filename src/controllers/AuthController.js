import AuthService from '../services/AuthService.js';
import AuthSerializer from '../serializers/AuthSerializer.js';

class AuthController {
  async registration(req, res, next) {
    const data = await AuthService.registration(req.body, next);
    req.serializer = new AuthSerializer(data, { url: 'registration'});
    next();
  }

  async login(req, res, next) {
    const data = await AuthService.login(req.body, next);
    req.serializer = new AuthSerializer(data, { url: 'registration'});
    next();
  }
}

export default new AuthController();
