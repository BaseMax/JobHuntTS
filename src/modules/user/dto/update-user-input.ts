import { IsOptional, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserProfile {
  @Field()
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsOptional()
  password?: string;
}
