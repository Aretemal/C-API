import Serializer from './Serializer.js';

class PaymentsSerializer extends Serializer {
  type() {
    return 'Balance';
  }

  attributes() {
    return {
      balance: this.resource.balance,
      amount: this.resource?.amount,
      created: this.resource?.created_at,
      newBalance: this.resource?.newBalance,
    };
  }

  links() {
    return { self: `http://localhost:5000/api/balance/${this.options.url || ''}` };
  }
}
export default PaymentsSerializer;
