import jwt from "jsonwebtoken";
import User from "./models/user.model.js";
import { config } from "./config/config.js";

export const auth = async (req, res, next) => {
  const header = req.header("Authorization");
  const token = header?.split(" ")[1];

  if (!token) return res.status(401).send("Access Denied: No Token Provided!");

  const verified = jwt.verify(token, config.JWT_KEY);
  let user = await User.findOne({ email: verified.email });
  req.profile = user;
  req.token = token;
  next();
};
