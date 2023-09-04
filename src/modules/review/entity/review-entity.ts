import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Review {
  @Field()
  id: string;

  @Field(() => Float)
  rating: number;

  @Field()
  content: string;

  @Field()
  jobId: string;

  @Field(() => Date)
  createdAt: Date;
}
