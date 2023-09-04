import { IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsValidRatingField } from "./custom-validators";

@InputType()
export class UpdateReviewInput {
  @Field()
  @IsMongoId()
  reviewId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsValidRatingField({
    message: "it  is not acceptable ,it must be 3 character long .",
  })
  rating: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  content: string;
}
