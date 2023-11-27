import ResultSerializer from "../serializers/ResultSerializer.js";
import ResultService from "../services/ResultService.js";

class ResultController {
  async roulette(req, res, next) {
    const result = await ResultService.roulette(
        {
        ...req.body,
        userId: req.user.id,
    });
    req.serializer = new ResultSerializer(result, { url: 'roulette'});
    next();
  }
}

export default new ResultController();
