import mongoose from "mongoose";

const schema = new mongoose.Schema({
  razorpay_signature: {
    type: String,
    require: true,
  },
  razorpay_payment_id: {
    type: String,
    require: true,
  },
  razorpay_subscription_id: {
    type: String,
    require: true,
  },
  CreatedAt: {
    default: Date.now,
    type: Date,
  },
});

export const Payment = mongoose.model("Payment", schema);
