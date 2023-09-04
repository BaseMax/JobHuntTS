import { injectable } from "tsyringe";
import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Review } from "./entity/review-entity";
import { CreateReviewInput } from "./dto/create-review-input";
import { ReviewService } from "./review-service";
import { GetCurrentUserId } from "../common/get-current-userId";
import { UpdateReviewInput } from "./dto/update-review-input";

@Resolver()
@injectable()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  @Authorized()
  async createReview(
    @Arg("input") createReviewInput: CreateReviewInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.reviewService.createReview(userId, createReviewInput);
  }

  @Mutation(() => Review)
  @Authorized()
  async updateReview(
    @Arg("input") updateReviewInput: UpdateReviewInput,
    @GetCurrentUserId() userId: string
  ) {
    const review = await this.reviewService.canModify(
      userId,
      updateReviewInput.reviewId
    );

    return await this.reviewService.updateReview(updateReviewInput);
  }
}
