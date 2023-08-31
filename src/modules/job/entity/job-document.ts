import { Document, Types } from "mongoose";

export interface JobDocument extends Document {
  readonly title: string;
  readonly company: string;
  readonly categoryId: Types.ObjectId;
  readonly salary: string;
  readonly description: string;
  readonly requirements: string[];
  readonly location: string;
  readonly featured: Boolean;
  readonly createdAt: Date;
}
