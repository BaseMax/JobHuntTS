import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { BookMark } from "./entity/bookMark-entity";
import { CreateBookMarkInput } from "./dto/bookMark-input";
import { GetCurrentUserId } from "../common/get-current-userId";
import { BookMarkService } from "./bookMark-service";
import { JobService } from "../job/job-service";

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
}
