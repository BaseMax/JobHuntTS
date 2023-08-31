import { IsArray, IsBoolean, IsMongoId, IsString } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateJobInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  company: string;

  @Field()
  @IsMongoId()
  categoryId: string;

  @Field(() => String)
  @IsString()
  salary: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @Field()
  @IsString()
  location: string;

  @Field()
  @IsBoolean()
  featured: boolean;
}
