import express from "express";
import {
  handlRegister,
  handleLogin,
  handleLogout,
} from "../controllers/userController.js";

const router = express.Router();

// register
router.route("/register").post(handlRegister);

// login
router.route("/login").post(handleLogin);

// logout
router.route("/logout").get(handleLogout);

export default router;
