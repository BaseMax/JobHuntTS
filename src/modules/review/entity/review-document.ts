import { Document, Types } from "mongoose";

export interface ReviewDocument extends Document {
  readonly userId: Types.ObjectId;
  readonly jobId: Types.ObjectId;
  readonly rating: number;
  readonly createdAt: Date;
}
