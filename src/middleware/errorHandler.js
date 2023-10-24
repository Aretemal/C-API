/* eslint-disable no-unused-vars */
import ErrorSerializer from '../serializers/ErrorSerializer.js';

export const errorHandler = (error, req, res, next) => {
  if (!(error instanceof Error)) {
    const serializer = new ErrorSerializer(error.errorsArray);
    res.send(serializer.serialize());
    console.log(error);
    next(error);
  } else {
    console.log(error);
  }
  next(error);
};
