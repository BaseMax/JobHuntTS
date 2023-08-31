import mongoose from "mongoose";
import { JobSchema } from "../../job/entity/job-model";
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  jobs: { type: [JobSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
