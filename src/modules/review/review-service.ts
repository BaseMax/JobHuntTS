import { GraphQLError } from "graphql";
import { CreateReviewInput } from "./dto/create-review-input";
import { UpdateReviewInput } from "./dto/update-review-input";
import { ReviewDocument } from "./entity/review-document";
import { ReviewModel } from "./entity/review-model";

export class ReviewService {
  async createReview(
    userId: string,
    createReviewInput: CreateReviewInput
  ): Promise<ReviewDocument> {
    return await ReviewModel.create({
      userId: userId,
      ...createReviewInput,
    });
  }

  async updateReview(
    updateReviewInput: UpdateReviewInput
  ): Promise<ReviewDocument | null> {
    return await ReviewModel.findByIdAndUpdate(
      updateReviewInput.reviewId,
      {
        $set: updateReviewInput,
      },
      {
        returnOriginal: false,
      }
    );
  }

  async canModify(
    userId: string,
    reviewId: string
  ): Promise<ReviewDocument | null> {
    const review = await ReviewModel.findOne({
      _id: reviewId,
      userId: userId,
    });

    if (!review)
      throw new GraphQLError("you aren't allowed to modify this review");

    return review;
  }
}
