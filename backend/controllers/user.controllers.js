import { config } from "../config/config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { name, email } = req.body;
    // const alreadyExists = await User.findOne({ email });
    // if (alreadyExists) {
    //   return res.status(400).json({ error: "email already exist" });
    // }
    const user = await User.create({ name, email });
    const token = await jwt.sign({ name, email }, config.JWT_KEY);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (req, res) => {
  try {
    console.log(req.profile);
    res.status(200).json(req.profile);
  } catch (e) {
    console.log(e);
  }
};

export const updateData = async (req, res) => {
  const { name, value } = req.body;
  ``;
  const { _id, rm1, rm2 } = req.profile;
  if ((name == "fp1" || name == "fp2") && value == -1) {
    return res.status(400).json("Invalid request");
  }
  if (name === "rm1" || name === "rm2") {
    if (
      (name === "rm1" && value == -1 && rm1 == 0) ||
      (name === "rm2" && value == -1 && rm2 == 0)
    ) {
      return res.status(400).json("nraw materials can't be in nagative");
    }
    await User.findByIdAndUpdate(
      _id,
      { $inc: { [name]: value } },
      { new: true }
    );
  }
  if (name === "fp1") {
    if ((rm1 < 8 || rm2 < 5) && value === 1) {
      return res
        .status(400)
        .json("not enough raw materials for finished product 1");
    } else {
      await User.findByIdAndUpdate(
        _id,
        { $inc: { fp1: 1, rm1: -8, rm2: -5 } },
        { new: true }
      );
    }
  }
  if (name === "fp2") {
    if ((rm1 < 7 || rm2 < 10) && value === 1) {
      return res
        .status(400)
        .json("not enough raw materials for finished product 2");
    } else {
      await User.findByIdAndUpdate(
        _id,
        { $inc: { fp2: 1, rm1: -7, rm2: -10 } },
        { new: true }
      );
    }
  }
  res.status(200).json("successfully updated");
};
