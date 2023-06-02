import app from "./App.js";
import { connectDb } from "./config/database.js";

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
