import express from "express";
import { handlRegister } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(handlRegister);

export default router;
