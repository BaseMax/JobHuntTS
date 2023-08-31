import { Document } from "mongoose";
import { JobDocument } from "../../job/entity/job-document";

export interface CategoryDocument extends Document {
  readonly name: string;
  readonly jobs: JobDocument[];
  readonly createdAt: Date;
}
