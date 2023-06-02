import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const getAll = await Course.find().select("-lectures");
  res.status(200).json({
    success: true,
    getAll,
  });
});

export const createcourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, CreatedBy } = req.body;

  if (!title || !description || !category || !CreatedBy) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  //   const file = req.file;

  await Course.create({
    title,
    description,
    category,
    CreatedBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });
  res.status(201).json({
    success: true,
    message: "Course Created Successfully",
  });
});
