import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Application {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  jobId: string;

  @Field()
  status: string;

  
  @Field(() => Date)
  createdAt: Date;
}
