import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { Application } from "./entity/application-entity";
import { ApplicationInput } from "./dto/application-input";
import { injectable } from "tsyringe";
import { ApplicationService } from "./application-service";
import { GetCurrentUserId } from "../common/get-current-userId";
import { JobService } from "../job/job-service";
import { GraphQLError } from "graphql";
import { UpdateApplication } from "./dto/update-application-input";
import { Mongo } from "../common/mongoId-input";

@Resolver()
@injectable()
export class ApplicationResolver {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly jobService: JobService
  ) {}

  @Mutation(() => Application, { nullable: true })
  @Authorized()
  async apply(
    @Arg("input") applicationInput: ApplicationInput,
    @GetCurrentUserId() userId: string
  ) {
    const job = await this.jobService.findByIdOrThrow(applicationInput.jobId);
    const hasApplied = await this.applicationService.hasApplied(
      userId,
      applicationInput.jobId
    );

    if (hasApplied)
      throw new GraphQLError("You have already applied to this job.");
    return this.applicationService.apply(userId, applicationInput);
  }

  @Mutation(() => Application, { nullable: true })
  @Authorized()
  async updateStatus(@Arg("input") updateApplication: UpdateApplication) {
    const application = await this.applicationService.findByIdOrThrow(
      updateApplication.applicationId
    );
    return await this.applicationService.updateStatus(updateApplication);
  }

  @Mutation(() => Application, { nullable: true })
  @Authorized()
  async withdraw(@Arg("input") mongo: Mongo) {
    const application = await this.applicationService.findByIdOrThrow(mongo.id);
    return await this.applicationService.withdrawApplication(mongo.id);
  }
}
