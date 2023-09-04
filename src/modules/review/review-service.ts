import { CreateReviewInput } from "./dto/create-review-input";
import { ReviewDocument } from "./entity/review-document";
import { ReviewModel } from "./entity/review-model";

export class ReviewService {
  async createReview(
    userId: string,
    createReviewInput: CreateReviewInput
  ): Promise<ReviewDocument> {
    return ReviewModel.create({
      userId: userId,
      ...createReviewInput,
    });
  }
}
