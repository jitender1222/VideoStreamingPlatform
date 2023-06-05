import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

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

  const file = req.file;
  console.log(file);

  // file uri
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  await Course.create({
    title,
    description,
    category,
    CreatedBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Course Created Successfully",
  });
});

export const getCourseLecture = async () => {
  const course = Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
};

// add lectures
export const addCourseLectures = async () => {
  const course = Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.lectures.push({
    title,
    description,
    video: {
      public_id: "url",
      url: "url",
    },
  });

  getAllCourses.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in course successfully",
  });
};
