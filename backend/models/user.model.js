import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  rm1: { type: Number, default: 0 },
  rm2: { type: Number, default: 0 },
  fp1: { type: Number, default: 0 },
  fp2: { type: Number, default: 0 },
});

const User = mongoose.model("user", userSchema);
export default User;
