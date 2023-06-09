import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./config/.env",
});

const app = express();
// middlewear
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cookie parser

app.use(cookieParser());

// importing routes

import course from "./routes/CourseRoute.js";
import user from "./routes/userRoute.js";
import { errorMiddlewear } from "./middlewears/Error.js";
import payment from "./routes/paymentRoute.js";

// routes
app.use("/api/v1/course", course);
app.use("/api/v1/user", user);
app.use("/api/v1/payment", payment);

// error middlewear
app.use(errorMiddlewear);

export default app;
