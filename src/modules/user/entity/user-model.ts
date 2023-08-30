import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  refreshToken: { type: String },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model("User", userSchema);
