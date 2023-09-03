import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { BookMark } from "./entity/bookMark-entity";
import { CreateBookMarkInput } from "./dto/bookMark-input";
import { GetCurrentUserId } from "../common/get-current-userId";
import { BookMarkService } from "./bookMark-service";
import { JobService } from "../job/job-service";
import { GraphQLError } from "graphql";
import { Mongo } from "../common/mongoId-input";
import { Job } from "../job/entity/job-entity";
import { BookMarkAndCount } from "./entity/bookMark-count-entity";

@Resolver()
@injectable()
export class BookMarkResolver {
  constructor(
    private readonly bookMarkService: BookMarkService,
    private readonly jobService: JobService
  ) {}
  @Mutation(() => BookMark)
  @Authorized()
  async addBookMark(
    @Arg("input") createBookMarkInput: CreateBookMarkInput,
    @GetCurrentUserId() userId: string
  ) {
    const job = this.jobService.findByIdOrThrow(createBookMarkInput.jobId);
    const bookedMarkJob = this.bookMarkService.verifyBookedMarkJob(
      userId,
      createBookMarkInput.jobId
    );
    await Promise.all([job, bookedMarkJob]);

    const hasBookMark = await this.bookMarkService.hasBookMark(userId);

    return hasBookMark
      ? this.bookMarkService.addBookMark(userId, createBookMarkInput.jobId)
      : this.bookMarkService.createBookMark(userId, createBookMarkInput.jobId);
  }

  @Mutation(() => BookMark, { nullable: true })
  @Authorized()
  async removeBookMark(
    @Arg("input") removeBookMarkInput: Mongo,
    @GetCurrentUserId() userId: string
  ) {
    const job = await this.jobService.findByIdOrThrow(removeBookMarkInput.id);
    const hasBookedMarkJob = await this.bookMarkService.hasBookedMarkJob(
      userId,
      removeBookMarkInput.id
    );

    if (!hasBookedMarkJob)
      throw new GraphQLError("You haven't booked mark this job .");
    return this.bookMarkService.removeBookMark(userId, removeBookMarkInput.id);
  }

  @Query(() => [Job], { nullable: true })
  @Authorized()
  async getBookedMarkJobs(@GetCurrentUserId() userId: string) {
    return await this.bookMarkService.getBookedMarkJobs(userId);
  }

  @Query(() => BookMarkAndCount, { nullable: true })
  @Authorized()
  async getUserBookmarkCount(
    @GetCurrentUserId() userId: string
  ): Promise<BookMarkAndCount | null> {
    const bookMark = await this.bookMarkService.getBookMark(userId);
    console.log(bookMark);

    if (!bookMark) {
      return null;
    }
    const countOfJobs = await this.bookMarkService.getJobCountInBookMark(
      userId
    );
    return {
      id: bookMark?._id,
      userId: bookMark.userId.toString(),
      jobsId: bookMark?.jobsId.map((j) => j.toString()),
      countOfJobs: countOfJobs,
      createdAt: bookMark.createdAt,
    };
  }
}
