import dotenv from 'dotenv';

dotenv.config();
class Serializer {
  constructor(resource, options = {}) {
    this.resource = resource;
    this.options = options;
  }

  serialize() {
    return {
      data: {
        type: this.type(),
        id: this.id(),
        attributes: this.attributes(),
        links: this.links(),
      },
    };
  }

  type() {
    return '';
  }

  id() {
    return `${this.resource.id}`;
  }

  attributes() {
    return { attributes: '' };
  }

  links() {
    return { self: '' };
  }
}
export default Serializer;
