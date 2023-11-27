import Serializer from './Serializer.js';

class ResultSerializer extends Serializer {
  type() {
    return 'Result';
  }

  attributes() {
    return {
      amount: this.resource.amount,
      game: this.resource.game,
      selected: this.resource.selected,
      result: this.resource.result,
      created: this.resource?.created_at,
    };
  }

  links() {
    return { self: `http://localhost:5000/api/result/${this.options.url}` };
  }
}
export default ResultSerializer;
