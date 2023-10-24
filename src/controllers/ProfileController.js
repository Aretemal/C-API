import UserSerializer from "../serializers/UserSerializer.js";
import ProfileService from "../services/ProfileService.js";

class ProfileController {
  async getInfoAuthorizedUser(req, res, next) {
    const user = await ProfileService.getInfoAuthorizedUser(req.user.id, next);
    req.serializer = new UserSerializer(user);
    next();
  }
}

export default new ProfileController();
