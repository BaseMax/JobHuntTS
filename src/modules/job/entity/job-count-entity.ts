import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class JobAndCount {
    @Field()
    id : string 

    @Field()
    title : string

    @Field(()=>Int)
    countOfApplications: number
}
