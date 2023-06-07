import express from "express";
import {
  addCourseLectures,
  createcourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLecture,
} from "../controllers/courseContoller.js";
import singleUpload from "../middlewears/multer.js";
import {
  authorizeAdmin,
  isAuthenticated,
} from "../middlewears/isAuthenticated.js";

const router = express.Router();

// get all courses without lectures
router.route("/allCourse").get(getAllCourses);

// create a course by admin only
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createcourse);

// create new course
router
  .route("/lectures/:id")
  .get(isAuthenticated, getCourseLecture)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addCourseLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// delete lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);
//

export default router;
