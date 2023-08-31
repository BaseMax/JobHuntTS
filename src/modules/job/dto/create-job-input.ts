import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
} from "class-validator";
import { InputType, Field } from "type-graphql";
import { JobDocument } from "../entity/job-document";

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
