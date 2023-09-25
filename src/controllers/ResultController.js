import ResultSerializer from "../serializers/ResultSerializer.js";
import ResultService from "../services/ResultService.js";

class ResultController {
  async roulette(req, res, next) {
    const { result, id } = await ResultService.roulette(req.body.selectedNumber);
    req.serializer = new ResultSerializer({ result, id }, { url: 'roulette'});
    next();
  }
}

export default new ResultController();
