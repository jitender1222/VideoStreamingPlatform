import express from "express";
import {
  addToPlaylist,
  forgetPassword,
  handlRegister,
  handleChangePassword,
  handleLogin,
  handleLogout,
  handleMyProile,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePic,
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

// change Password
router.route("/changePassword").put(isAuthenticated, handleChangePassword);

// update Profile
router.route("/updateProfile").put(isAuthenticated, updateProfile);

// update profile pic
router.route("/updateProfilePic").put(isAuthenticated, updateProfilePic);

// forget password
router.route("/forgetPassword").post(isAuthenticated, forgetPassword);

// reset password
router.route("/resetPassword/:token").put(isAuthenticated, resetPassword);

// add to playlist
router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist);

export default router;
