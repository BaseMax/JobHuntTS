import { Field, Int, ObjectType } from "type-graphql";
import { BookMark } from "./bookMark-entity";

@ObjectType()
export class BookMarkAndCount extends BookMark {
  @Field(() => Int)
  countOfJobs: number;
}
