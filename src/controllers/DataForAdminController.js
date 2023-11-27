import UserSerializer from "../serializers/UserSerializer.js";
import DataForAdminService from "../services/DataForAdminService.js";
import CollectionSerializer from "../serializers/CollectionSerializer.js";
import SuccessSerializer from "../serializers/SuccessSerializer.js";
import PaymentsSerializer from "../serializers/PaymentsSerializer.js";
import ResultSerializer from "../serializers/ResultSerializer.js";

class DataForAdminController {
  async getUsers(req, res, next) {
    const users = await DataForAdminService.getUsers( {
      filter: req.body.filter,
      size: req.body.size,
      page: req.params.page,
    }, next);
    req.serializer = new CollectionSerializer(
        users,
        {
          serializerType: UserSerializer,
        },
    );
    next();
  }

  async updateUser(req, res, next) {
    const user = await DataForAdminService.updateUser({ id: req.body.id }, {...req.body.data}, next);
    if (user) {
      req.serializer = new SuccessSerializer();
    }
    next();
  }

  async getPayments(req, res, next) {
    const payments = await DataForAdminService.getPayments({
      id: req.params.id,
    }, next);
    req.serializer = new CollectionSerializer(
        payments,
        {
          serializerType: PaymentsSerializer,
        },
    );
    next();
  }

  async getResults(req, res, next) {
    const rouletteResults = await DataForAdminService.getResults({
      id: req.params.id,
    }, next);
    req.serializer = new CollectionSerializer(
        rouletteResults,
        {
          serializerType: ResultSerializer,
        },
    );
    next();
  }
}

export default new DataForAdminController();
