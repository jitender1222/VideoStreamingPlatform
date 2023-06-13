import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Email } from "../utils/sendMail.js";
import ErrorHandler from "../utils/errorHandler.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("All fields are mandatory"));

  const to = process.env.MY_MAIL;

  const subject = "Contact from CourseHub";

  const text = `I am ${name} and my Email is ${email}. \n${message} `;

  await Email(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been sent",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("All fields are mandatory"));

  const to = process.env.MY_MAIL;

  const subject = "Contact from CourseHub";

  const text = `I am ${name} and my Email is ${email}. \n${course} `;

  await Email(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been sent",
  });
});

export const dashboardStats = catchAsyncError(async (req, res, next) => {});
