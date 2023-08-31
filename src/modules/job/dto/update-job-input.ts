import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateJobInput {
  @Field()
  @IsMongoId()
  jobId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  company: string;

  @Field({ nullable: true })
  @IsMongoId()
  @IsOptional()
  categoryId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  salary: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements: string[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  location: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  featured: boolean;
}
