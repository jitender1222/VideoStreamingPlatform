import express from "express";
import {
  contact,
  courseRequest,
  dashboardStats,
} from "../controllers/otherController.js";
import { isAuthenticated } from "../middlewears/isAuthenticated.js";
import { authorizeAdmin } from "../middlewears/isAuthenticated.js";

const router = express.Router();

router.route("/contact").post(contact);

router.route("/courseRequest").post(courseRequest);

router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, dashboardStats);

export default router;
