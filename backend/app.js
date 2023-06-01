import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env",
});

const app = express();

// importing routes

import course from "./routes/CourseRoute.js";
import user from "./routes/userRoute.js";

app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;
