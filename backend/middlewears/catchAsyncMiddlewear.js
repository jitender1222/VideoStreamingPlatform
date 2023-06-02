export const catchAsyncError = (PassFunc) => (req, res, next) => {
  Promise.resolve(PassFunc(req, res)).catch(next);
};
