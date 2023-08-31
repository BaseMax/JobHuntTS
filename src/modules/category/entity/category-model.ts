import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
