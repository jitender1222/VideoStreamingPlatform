import mongoose from "mongoose";

const schema = new mongoose.Schema({
  users: {
    type: Number,
    require: true,
  },
  subscription: {
    type: Number,
    require: true,
  },
  views: {
    type: Number,
    require: true,
  },
  CreatedAt: {
    default: Date.now,
    type: Date,
  },
});

export const Stats = mongoose.model("Stats", schema);
