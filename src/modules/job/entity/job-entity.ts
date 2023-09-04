import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Job {
  @Field()
  id : string
    
  @Field()
  title: string;
  @Field()
  company: string;

  @Field()
  categoryId: string;

  @Field(() => String)
  salary: string;

  @Field()
  description: string;

  @Field(() => [String])
  requirements: string[];

  @Field(() => String)
   location: string;

  @Field(() => Boolean)
   featured: boolean;

  @Field(() => Date)
  createdAt: Date;
}
