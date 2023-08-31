import { Field, ObjectType } from "type-graphql";
import { Job } from "../../job/entity/job-entity";

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(()=>[Job])
  jobs : Job[]

  @Field(() => Date)
  createdAt: Date;
}
