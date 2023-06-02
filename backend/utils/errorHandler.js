class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// console.log("inside the error handdler");

export default ErrorHandler;
