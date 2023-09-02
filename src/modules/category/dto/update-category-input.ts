import { IsMongoId, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsMongoId()
  categoryId: string;

  @Field()
  @IsString()
  name: string;
}
