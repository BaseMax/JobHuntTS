import { Document, Types } from "mongoose";

export interface BookMarkDocument extends Document {
  readonly userId: Types.ObjectId;
  readonly jobsId: Types.ObjectId[];
  readonly createdAt: Date;
}
