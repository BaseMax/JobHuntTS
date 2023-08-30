import { IsEmail, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";
import { ICreateUserInput } from "../../../interfaces/create-user-input";

@InputType()
export class SignupInput implements ICreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  password: string;
}
