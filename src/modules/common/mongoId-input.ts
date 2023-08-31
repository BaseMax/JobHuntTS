import { IsMongoId } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class Mongo {
  @Field()
  @IsMongoId()
  id: string;
}
