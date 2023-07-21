import { Router } from "express";
import {
  getUserData,
  login,
  updateData,
} from "../controllers/user.controllers.js";
import { auth } from "../auth.middleware.js";

const userRoute = Router();

userRoute.post("/login", login);
userRoute.get("/data", auth, getUserData);
userRoute.patch("/updatedata", auth, updateData);

export default userRoute;
