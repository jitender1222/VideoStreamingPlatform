import { Course } from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const getAll = await Course.find();
    res.status(200).json({
      success: true,
      getAll,
    });
  } catch (error) {
    console.log("Error while fetching All Courses", error);
  }
};
