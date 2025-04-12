const CustomError = require('./CustomError');

class InvalidParamError extends CustomError {
     constructor(message, url) {
          super(message);
          this.statusCode = 400;
          this.name = "InvalidParamError";
          this.url = url
     }
}

module.exports = InvalidParamError;
