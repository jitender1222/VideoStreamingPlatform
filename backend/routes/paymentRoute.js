import express from "express";
import { isAuthenticated } from "../middlewears/isAuthenticated.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorpayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated, buySubscription);

router.route("/paymentverification").post(isAuthenticated, paymentVerification);

router.route("/getrazorpaykey").get(getRazorpayKey);

router.route("/cancelSubscription").delete(isAuthenticated, cancelSubscription);

export default router;
