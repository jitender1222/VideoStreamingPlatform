import express from "express";
import { createcourse, getAllCourses } from "../controllers/courseContoller.js";

const router = express.Router();

// get all courses without lectures
router.route("/course").get(getAllCourses);

// create a course by admin only
router.route("/createcourse").post(createcourse);

// add lectures get course details delete course

// delete lecture

//

export default router;
