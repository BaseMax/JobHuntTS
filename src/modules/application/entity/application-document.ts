import { Document, Types } from "mongoose";

export interface ApplicationDocument extends Document {
  readonly userId: Types.ObjectId;
  readonly jobId: Types.ObjectId;
  readonly createdAt: Date;
}
