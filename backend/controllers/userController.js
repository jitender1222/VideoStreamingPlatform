import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Token } from "../utils/sentToken.js";
import { Email } from "../utils/sendMail.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";

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
export const handleLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please fill all the fields"), 400);

  // if user exist
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User Not Found"), 409);

  // if user found compare password
  let isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect email and password", 401));

  Token(res, user, `Welcome back ${user.name}`, 201);
});

export const handleLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});
export const handleMyProile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
export const handleChangePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    messgae: "Password Updated Successfully",
  });
});
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;
  res.status(200).json({
    success: true,
    messgae: "Profile Updated Successfully",
  });
});

export const updateProfilePic = catchAsyncError((req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile Pic Updated Successfully",
  });
});

// forget password
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return next(new ErrorHandler("User not found with this email", 400));

  const resetToken = await user.getResetToken();
  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  const message = `Click on this link to reset your password ${url}.If you have not request then please ignore it`;

  // send token to email
  await Email(user.email, "Your reset password link ", message);
  res.status(200).json({
    success: true,
    message: `Reset token has been sent to this ${user.email} successfully`,
  });
});

// reset Password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    ResetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or has been expired", 401));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.ResetPasswordExpire = undefined;

  user.save();
  res.status(200).json({
    success: true,
    message: "Password changed Successfully",
    token,
  });
});

// add playlist

export const addToPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.body.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const courseExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (courseExist) return next(new ErrorHandler("Course Already Exist", 409));

  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();
  res.status(200).json({
    success: true,
    message: "Course Added Successfully",
  });
});
export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const course = await Course.findById(req.query.id);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Course Removed Successfully",
  });
});