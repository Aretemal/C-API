import Serializer from './Serializer.js';

class PaymentsSerializer extends Serializer {
  type() {
    return 'Result';
  }

  attributes() {
    return {
      balance: this.resource.balance,
    };
  }

  links() {
    return { self: `${process.env.API_URL}balance/${this.options.url || ''}` };
  }
}
export default PaymentsSerializer;
