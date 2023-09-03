import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BookMark {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field(() => [String])
  jobsId: string[];

  @Field(() => Date)
  createdAt: Date;
}
