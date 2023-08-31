import { injectable } from "tsyringe";
import { CreateJobInput } from "./dto/create-job-input";
import { JobDocument } from "./entity/job-document";
import { JobModel } from "./entity/job-model";
import { Types } from "mongoose";
import { UpdateJobInput } from "./dto/update-job-input";
import { GraphQLError } from "graphql";

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

  async getJobById(id: string): Promise<JobDocument | null> {
    return JobModel.findById(id);
  }

  async getJobByTitle(title: string): Promise<JobDocument[]> {
    return JobModel.find({
      title: { $regex: title, $options: "i" },
    });
  }

  async getFeaturedJobs(): Promise<JobDocument[]> {
    return JobModel.find({ featured: true });
  }

  async findByIdOrThrow(id: string): Promise<JobDocument | null> {
    const job = await JobModel.findById(id);
    console.log(job);

    if (!job) throw new GraphQLError("there is no job with associated id");
    return job;
  }
  async updateJob(updateJobInput: UpdateJobInput): Promise<JobDocument | null> {
    return await JobModel.findByIdAndUpdate(
      updateJobInput.jobId,
      {
        $set: { ...updateJobInput },
      },
      {
        returnOriginal: false,
      }
    );
  }
}
