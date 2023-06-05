import app from "./App.js";
import { connectDb } from "./config/database.js";
import cloudinary from "cloudinary";

connectDb();

cloudinary.v2.config({
  cloud_name: "dhmh4xpkr",
  api_key: "421456475899664",
  api_secret: "I9B43F-hdrmmNRLpK4VGpO89-3Q",
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
