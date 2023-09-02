import { Document, Types } from "mongoose";

export interface ApplicationDocument extends Document {
  readonly userId: Types.ObjectId;
  readonly jobId: Types.ObjectId;
  readonly status: string;
  readonly createdAt: Date;
}
