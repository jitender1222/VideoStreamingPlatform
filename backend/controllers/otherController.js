import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Email } from "../utils/sendMail.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Stats } from "../models/Stats.js";

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

export const dashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const userCount = statsData[11].users;
  const subscription = statsData[11].subscription;
  const views = statsData[11].views;

  let userPercentage = 0;
  let viewPercentage = 0;
  let subscriptionPercentage = 0;

  let userProfit = true;
  let viewProfit = true;
  let subscriptionProfit = true;

  if (statsData[10].users === 0) userPercentage = userCount * 100;
  if (statsData[10].views === 0) viewPercentage = userCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = userCount * 100;
  else {
    const diff = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    userPercentage = (diff.users / statsData[10].users) * 100;
    viewPercentage = (diff.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (diff.subscription / statsData[10].subscription) * 100;

    if (userPercentage < 0) userProfit = false;
    if (viewPercentage < 0) viewProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.stats(200).json({
    success: true,
    stats: statsData,
    userCount,
    subscription,
    views,
    userPercentage,
    viewPercentage,
    subscriptionPercentage,
    userProfit,
    viewProfit,
    subscriptionProfit,
  });
});
