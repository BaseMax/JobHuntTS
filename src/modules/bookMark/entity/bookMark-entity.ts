import { Field, ObjectType } from "type-graphql";


@ObjectType()
export  class BookMark{

    @Field()
    userId : string

    @Field(()=>[String])
    jobsId : string[]

    @Field(()=>Date)
    createdAt :Date
}