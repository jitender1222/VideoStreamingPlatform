import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Please enter your name"],
  },
  email: {
    type: "string",
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: "string",
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  role: {
    type: "string",
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const User = mongoose.model("User", schema);
