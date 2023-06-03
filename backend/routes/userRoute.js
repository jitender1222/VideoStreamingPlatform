import express from "express";
import { handlLogout, handlRegister } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(handlRegister);
router.route("/login").post(handlLogout);

export default router;
