import express from "express";
import { config } from "./config/config.js";
const { PORT, MONGO_URI } = config;
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
    process.exit();
  });

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
