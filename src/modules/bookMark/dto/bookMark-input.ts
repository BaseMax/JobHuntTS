import { IsMongoId } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBookMarkInput {

    @Field()
    @IsMongoId()
    jobId : string


}
