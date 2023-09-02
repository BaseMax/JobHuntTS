import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "./entity/job-entity";
import { CreateJobInput } from "./dto/create-job-input";
import { JobService } from "./job-service";
import { CategoryService } from "../category/category-service";
import { Mongo } from "../common/mongoId-input";
import { Search } from "./dto/search-job-input";
import { UpdateJobInput } from "./dto/update-job-input";

@injectable()
@Resolver()
export class JobResolver {
  constructor(
    private readonly jobService: JobService,
    private readonly categoryService: CategoryService
  ) {}

  @Mutation(() => Job, { nullable: true })
  @Authorized()
  async createJob(@Arg("input") createJobInput: CreateJobInput) {
    const category = await this.categoryService.findByIdOrThrow(
      createJobInput.categoryId
    );

    const job = await this.jobService.createJob(createJobInput);
    const addedJobCategory = await this.categoryService.addJob(
      createJobInput.categoryId,
      job
    );

    return job;
  }

  @Query(() => [Job], { nullable: true })
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Query(() => Job, { nullable: true })
  async getJobById(@Arg("input") mongo: Mongo) {
    return this.jobService.getJobById(mongo.id);
  }

  @Query(() => [Job], { nullable: true })
  async getJobsByTitle(@Arg("input") search: Search) {
    return this.jobService.getJobByTitle(search.title);
  }

  @Query(() => [Job])
  async getFeaturedJobs() {
    return await this.jobService.getFeaturedJobs();
  }

  @Query(() => [Job])
  async getSimilarJobs(@Arg("input") mongo: Mongo) {
    const job = await this.jobService.findByIdOrThrow(mongo.id);
    const categoryId = job?.categoryId.toString() as string;

    return await this.jobService.getSimilarJobs(categoryId, mongo.id);
  }

  @Query(() => [Job])
  async getRecentJobs() {
    return await this.jobService.getRecentJobs();
  } 

  @Mutation(() => Job, { nullable: true })
  @Authorized()
  async updateJob(@Arg("input") updateJobInput: UpdateJobInput) {
    const job = await this.jobService.findByIdOrThrow(updateJobInput.jobId);
    return this.jobService.updateJob(updateJobInput);
  }

  @Mutation(() => Job, { nullable: true })
  @Authorized()
  async deleteJob(@Arg("input") mongo: Mongo) {
    const job = await this.jobService.findByIdOrThrow(mongo.id);
    return this.jobService.deleteJob(mongo.id);
  }
}
