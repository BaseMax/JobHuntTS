import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserProfile {
  @Field()
  name: string;

  @Field()
  email: string;
}
