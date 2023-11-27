import Serializer from './Serializer.js';

class SuccessSerializer extends Serializer {
  serialize() {
    return {
      status: 'Success'
    }
  }
}
export default SuccessSerializer;
