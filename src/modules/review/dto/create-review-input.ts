import { IsMongoId, IsNumber, IsString, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsValidRatingField } from "./custom-validators";

@InputType()
export class CreateReviewInput {
  @Field()
  @IsMongoId()
  jobId: string;

  @Field()
  @IsNumber()
  @IsValidRatingField({
    message: "it  is not acceptable ,it must be 3 character long .",
  })
  rating: number;

  @Field()
  @IsString()
  content: string;
}
