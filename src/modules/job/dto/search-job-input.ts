import { IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class Search {
  @Field()
  @IsString()
  title: string;
}
