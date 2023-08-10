import { catchAsyncError } from "../middlewears/catchAsyncMiddlewear.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/Stats.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const getAll = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  }).select("-lectures");
  res.status(200).json({
    success: true,
    getAll,
  });
});

export const createcourse = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy || !file) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }
  // console.log("file inside the course controller 23", file);

  // file uri
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    message: "Course Created Successfully",
    course,
  });
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// add lectures
export const addCourseLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const course = await Course.findById(id);

  if (!title || !description)
    return next(new ErrorHandler("All fields are required"), 404);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  const file = req.file;
  // console.log("file inside the course controller 23", file);

  // file uri
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  getAllCourses.numOfVideos = course.lectures.length;
  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in course successfully",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.deleteOne({ _id: course.id });
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Courses not found", 404));

  const lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  await cloudinary.v2.uploader.destroy(lectures.video.public_id, {
    resource_type: "video",
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  await course.deleteOne({ _id: course.id });
  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
  });
});

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({});

  totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }

  stats[0].views = totalViews;
  stats[0].CreatedAt = new Date(Date.now());

  await stats[0].save();
});
