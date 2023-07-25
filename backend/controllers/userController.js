import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { Token } from "../utils/sentToken.js";
import { Email } from "../utils/sendMail.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

// handle Register
export const handlRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const file = req.file;

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please fill all the fields"), 400);

  // if user exist
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist"), 409);

  // Upload cloudinary

  // file uri
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  Token(res, user, "Register Successfully", 201);
});

// handleLogin
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

// Logout
export const handleLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
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

// change Password
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
    message: "Password Updated Successfully1",
  });
});

// update Profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email)
    return next(new ErrorHandler("Please fill all the fields", 400));

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;
  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  });
});

// .update profile pic

export const updateProfilePic = catchAsyncError(async (req, res, next) => {
  const file = req.file;

  const user = await User.findById(req.user._id);

  // file uri
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

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

// remove playlist
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

// get all users

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.findById({});
  res.status(200).json({
    success: true,
    message: "Successfully get all the users",
    user,
  });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 400));

  if (user.role == "user") user.role = "admin";
  else user.role = "user";

  await user.save();
  res.status(200).json({
    success: true,
    message: "Role Updated successfully",
    user,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 400));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // cancel subscription

  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const deleteMyProile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // cancel subscription

  await user.remove();
  res
    .status(200)
    .cookie({
      expiresIn: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "My profile deleted successfully",
    });
});

// User.watch().on("change", async () => {
//   const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
//   console.log(stats);

//   const subscription = await User.find({ "subscription.status": "active" });

//   stats[0].users = await User.countDocuments();
//   stats[0].subscription = subscription.length;
//   stats[0].CreatedAt = new Date(Date.now());

//   await stats[0].save();
// });
