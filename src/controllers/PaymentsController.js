import PaymentsService from "../services/PaymentsService.js";
import PaymentsSerializer from "../serializers/PaymentsSerializer.js";
import CollectionSerializer from "../serializers/CollectionSerializer.js";

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

  async getHistoryOfPayments(req, res, next) {
    const payments = await PaymentsService.getHistoryOfPayments({ userId: req.user.id }, next);
    req.serializer = new CollectionSerializer(
        payments,
        {
          serializerType: PaymentsSerializer,
        },
    );
    next();
  }
}

export default new PaymentsController();
