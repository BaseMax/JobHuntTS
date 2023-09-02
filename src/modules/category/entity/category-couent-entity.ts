import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryAndCount {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  countOfJobs: number;

  @Field(() => Date)
  createdAt: Date;
}
