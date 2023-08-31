import { Document } from "mongoose";

export interface CategoryDocument extends Document {
  readonly name: string;
  readonly createdAt: Date;
}
