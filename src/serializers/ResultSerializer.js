import Serializer from './Serializer.js';

class ResultSerializer extends Serializer {
  type() {
    return 'Result';
  }

  attributes() {
    return {
      result: this.resource.result,
      isWin: this.resource.isWin
    };
  }

  links() {
    return { self: `${process.env.API_URL}result/${this.options.url}` };
  }
}
export default ResultSerializer;
