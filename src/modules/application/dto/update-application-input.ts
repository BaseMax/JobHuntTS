import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsString } from "class-validator";
import { Field, InputType, registerEnumType } from "type-graphql";

enum Status {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

registerEnumType(Status, { name: "Status" });
@InputType()
export class UpdateApplication {
  @Field((type) => Status)
  status: Status;

  @Field()
  @IsMongoId()
  applicationId: string;
}
