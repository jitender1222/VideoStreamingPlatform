export const errorMiddlewear = (err, req, res, next) => {
  // console.log("inside the error");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
