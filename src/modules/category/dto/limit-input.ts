import { IsNumber } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class LimitInput {
  @Field(() => Int)
  @IsNumber()
  limit: number;
}
