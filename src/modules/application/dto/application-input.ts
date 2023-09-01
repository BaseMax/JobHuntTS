import { IsMongoId } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ApplicationInput {
  @Field()
  @IsMongoId()
  jobId: string;
}
