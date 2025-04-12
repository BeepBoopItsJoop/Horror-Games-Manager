const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
     constructor(message, url) {
          super(message);
          this.statusCode = 404;
          this.name = "NotFoundError";
          this.url = url;
     }
}

module.exports = NotFoundError;
