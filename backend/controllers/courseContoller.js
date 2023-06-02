import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Course } from "../models/Course.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const getAll = await Course.find();
  res.status(200).json({
    success: true,
    getAll,
  });
});
