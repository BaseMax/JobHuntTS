import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SearchCategoryInput {
  @Field()
  @IsString()
  name: string;
}
