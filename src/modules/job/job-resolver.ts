import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Job } from "./entity/job-entity";
import { CreateJobInput } from "./dto/create-job-input";
import { JobService } from "./job-service";
import { CategoryService } from "../category/category-service";
import { Mongo } from "../common/mongoId-input";
import { Search } from "./dto/search-job-input";

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

  @Query(()=>[Job])
  async getFeaturedJobs(){
    return await this.jobService.getFeaturedJobs()
  }
}
