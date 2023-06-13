import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncMiddlewear.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // console.log("decoded", decoded);

  req.user = await User.findById(decoded._id);

  next();
});

export const authorizeAdmin = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`
      ),
      403
    );
  }
  next();
});

export const authorizeSubscriber = catchAsyncError(async (req, res, next) => {
  if (req.user.subscription.status !== "active" && req.user.role !== "admin") {
    return next(
      new ErrorHandler(` Only Subscriber can access this resource`),
      403
    );
  }
  next();
});
