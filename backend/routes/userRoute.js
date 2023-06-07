import express from "express";
import {
  addToPlaylist,
  deleteMyProile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  handlRegister,
  handleChangePassword,
  handleLogin,
  handleLogout,
  handleMyProile,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePic,
  updateUser,
} from "../controllers/userController.js";
import {
  authorizeAdmin,
  isAuthenticated,
} from "../middlewears/isAuthenticated.js";
import singleUpload from "../middlewears/multer.js";

const router = express.Router();

// register
router.route("/register").post(singleUpload, handlRegister);

// login
router.route("/login").post(handleLogin);

// logout
router.route("/logout").get(handleLogout);

// myProfile
router
  .route("/myProfile")
  .get(isAuthenticated, handleMyProile)
  .delete(isAuthenticated, deleteMyProile);

// change Password
router.route("/changePassword").put(isAuthenticated, handleChangePassword);

// update Profile
router.route("/updateProfile").put(isAuthenticated, updateProfile);

// update profile pic
router
  .route("/updateProfilePic")
  .put(isAuthenticated, singleUpload, updateProfilePic);

// forget password
router.route("/forgetPassword").post(isAuthenticated, forgetPassword);

// reset password
router.route("/resetPassword/:token").put(isAuthenticated, resetPassword);

// add to playlist
router.route("/addToPlaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
router.route("/removeFromPlaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin route

router.route("/allUsers").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/allUsers/:id")
  .get(isAuthenticated, authorizeAdmin, updateUser)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
