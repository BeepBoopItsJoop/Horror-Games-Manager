class CustomError extends Error {
     constructor(message, statusCode = 500) {
          super(message);
          this.statusCode = statusCode ;
          this.name = 'CustomError';
     }
}

module.exports = CustomError;
