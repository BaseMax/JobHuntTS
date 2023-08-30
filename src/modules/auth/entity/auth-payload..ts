import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class AuthPayload {
  @Field()
  name: string;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
