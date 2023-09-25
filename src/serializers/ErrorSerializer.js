import dotenv from 'dotenv';
import ErrorCode from '../utils/ErrorCode.js';

dotenv.config();

class ErrorSerializer {
  constructor(errorsArray) {
    this.errorsArray = errorsArray;
    this.lang = 'en';
  }

  serialize() {
    return {
      errors:
        this.errorsArray.map((item) => {
          const data = {
            status: ErrorCode.getStatus(item.msg),
            title: ErrorCode.getTitle(item.msg, this.lang),
            detail: ErrorCode.getLanguage(item.msg, this.lang),
          };
          if (item.location && item.param) {
            data.source = {
              pointed: `${item.location}/${item.param}`,
            };
          }
          return data;
        }),
    };
  }
}
export default ErrorSerializer;
