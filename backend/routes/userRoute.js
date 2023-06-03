import express from "express";
import {
  handlRegister,
  handleLogin,
  handleLogout,
  handleMyProile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewears/isAuthenticated.js";

const router = express.Router();

// register
router.route("/register").post(handlRegister);

// login
router.route("/login").post(handleLogin);

// logout
router.route("/logout").get(handleLogout);

// myProfile
router.route("/myProfile").get(isAuthenticated, handleMyProile);

export default router;
