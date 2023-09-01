import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Application {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  jobId: string;

  @Field(() => Date)
  createdAt: Date;
}
