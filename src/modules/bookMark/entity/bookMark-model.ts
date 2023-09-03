import mongoose from "mongoose";

const BookMarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  jobsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      unique: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const BookMarkModel = mongoose.model("BookMark", BookMarkSchema);
