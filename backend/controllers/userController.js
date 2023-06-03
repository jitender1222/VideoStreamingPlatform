import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Token } from "../utils/sentToken.js";

export const handlRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return next(new ErrorHandler("Please fill all the fields"), 400);

  // if user exist
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist"), 409);

  // Upload cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempId",
      url: "tempUrl",
    },
  });

  Token(res, user, "Register Successfully", 201);
});
export const handlLogout = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill all the fields"), 400);

  // if user exist
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User Not Found"), 409);

  // if user found compare password
  let isMatch = await user.comparePassword(password);

  if (isMatch) return res.send(`Welcome back ${user.name}`);

  Token(res, user, "Register Successfully", 201);
});
