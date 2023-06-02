import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title can't exceed 80 characters"],
  },

  description: {
    type: String,
    required: [true, "Please enter the description"],
    minLength: [20, "Title must be at least 20 characters"],
  },

  lectures: [
    {
      title: {
        require: [true, "Add lecture title"],
        type: String,
      },
      description: {
        type: String,
        required: [true, "Add lecture description"],
      },
      video: {
        public_id: {
          type: String,
          required: [true, "Add video id"],
        },
        url: {
          type: String,
          required: [true, "Add video url"],
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    required: true,
    type: String,
  },
  CreatedBy: {
    required: [true, "Enter Course Creator Name"],
    type: String,
  },
  CreatedAt: {
    default: Date.now,
    type: Date,
  },
});

export const Course = mongoose.model("Course", schema);
