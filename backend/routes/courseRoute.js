import express from "express";
import {
  addCourseLectures,
  createcourse,
  getAllCourses,
  getCourseLecture,
} from "../controllers/courseContoller.js";
import singleUpload from "../middlewears/multer.js";

const router = express.Router();

// get all courses without lectures
router.route("/course").get(getAllCourses);

// create a course by admin only
router.route("/createcourse").post(singleUpload, createcourse);

// create new course
router
  .route("/course/:id")
  .get(getCourseLecture)
  .post(singleUpload, addCourseLectures);

// // getcourseLecture
// router.route("/course/:id").get(isAuthenticated, getCourseLecture);

// delete lecture

//

export default router;
