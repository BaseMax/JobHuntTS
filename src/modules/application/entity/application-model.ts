import mongoose from "mongoose";

export const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status :{type:String ,enum:["accepted" ,"pending","rejected"] , default:"pending"},
  createdAt: { type: Date, default: Date.now },
});

ApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });
export const ApplicationModel = mongoose.model(
  "Application",
  ApplicationSchema
);

// categoryId: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Category",
//   required: true,
// },
