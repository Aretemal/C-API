import PaymentsService from "../services/PaymentsService.js";
import PaymentsSerializer from "../serializers/PaymentsSerializer.js";

class PaymentsController {
  async updateBalance(req, res, next) {
    const { balance, id } = await PaymentsService.updateBalance({
      amount: req.body.amount, userId: req.user.id }, next)
    req.serializer = new PaymentsSerializer({ balance, id }, { url: 'update' });
    next();
  }
  async getBalance(req, res, next) {
    const { balance, id } = await PaymentsService.getBalance({ userId: req.user.id }, next);
    req.serializer = new PaymentsSerializer({ balance, id }, { url: 'read' });
    next();
  }
}

export default new PaymentsController();
