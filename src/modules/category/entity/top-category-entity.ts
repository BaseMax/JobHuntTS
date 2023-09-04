import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class TopCategory {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field(() => Int)
  countOfJobs: number;
}
