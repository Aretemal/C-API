import Serializer from './Serializer.js';

class CollectionSerializer extends Serializer {
  serialize(req) {
    const data = {
      data: this.collect(),
      links: this.links(req),
    };
    if (this.include) {
      data.included = this.included();
    }
    if (this.metaData) {
      data.meta = this.meta();
    }
    return data;
  }

  collect() {
    return this.resource.map((item) => {
      const serializer = new this.options.serializerType(item, {
        include: this.include,
        getter: this.getter,
      });
      return serializer.serialize().data;
    });
  }

  included() {
    const includeArray = [];
    const idArray = new Set();
    let k = 0;
    this.include.forEach((includedName) => {
      const IncludedClass = this.getter(includedName);

      this.resource.forEach((serializable) => {
        const serializer = new IncludedClass(serializable[includedName], { include: this.include });
        const { data } = serializer.serialize();
        idArray.add(data.id);
        if (k !== idArray.size) {
          includeArray.push(data);
          k++;
        }
      });
    });
    return includeArray;
  }

  meta() {
    return this.metaData;
  }

  links(req) {
    return { self: `http://localhost:5000/api/${req.originalUrl}` };
  }
}
export default CollectionSerializer;
