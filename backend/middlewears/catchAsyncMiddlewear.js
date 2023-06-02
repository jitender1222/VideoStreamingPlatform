export const catchAsyncError = (PassFunc) => (req, res, next) => {
  // console.log("inside the chat async");
  Promise.resolve(PassFunc(req, res, next)).catch(next);
};
