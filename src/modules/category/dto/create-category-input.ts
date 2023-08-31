import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsString()
  name: string;
}
