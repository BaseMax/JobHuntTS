import { injectable } from "tsyringe";
import { CreateJobInput } from "./dto/create-job-input";
import { JobDocument } from "./entity/job-document";
import { JobModel } from "./entity/job-model";
import { Types } from "mongoose";

@injectable()
export class JobService {
  async createJob(createJobInput: CreateJobInput): Promise<JobDocument> {
    return JobModel.create({
      title: createJobInput.title,
      description: createJobInput.description,
      salary: createJobInput.salary,
      requirements: createJobInput.requirements,
      company: createJobInput.company,
      featured: createJobInput.featured,
      location: createJobInput.location,
      categoryId: new Types.ObjectId(createJobInput.categoryId),
    });
  }

  async getJobs(): Promise<JobDocument[]> {
    return JobModel.find({});
  }
}
