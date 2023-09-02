import { injectable } from "tsyringe";
import { ApplicationInput } from "./dto/application-input";
import { ApplicationDocument } from "./entity/application-document";
import { ApplicationModel } from "./entity/application-model";
import { UpdateApplication } from "./dto/update-application-input";
import { GraphQLError } from "graphql";

@injectable()
export class ApplicationService {
  async apply(
    userId: string,
    applicationInput: ApplicationInput
  ): Promise<ApplicationDocument> {
    return ApplicationModel.create({ ...applicationInput, userId: userId });
  }
  async hasApplied(userId: string, jobId: string): Promise<boolean> {
    const application = await ApplicationModel.findOne({
      userId: userId,
      jobId: jobId,
    });

    return application ? true : false;
  }

  async findByIdOrThrow(id: string): Promise<ApplicationDocument | null> {
    const application = await ApplicationModel.findById(id);
    if (!application)
      throw new GraphQLError("there is no application with this id.");

    return application;
  }
  async updateStatus(
    updateApplication: UpdateApplication
  ): Promise<ApplicationDocument | null> {
    return await ApplicationModel.findByIdAndUpdate(
      updateApplication.applicationId,
      {
        $set: {
          status: updateApplication.status,
        },
      },
      {
        returnOriginal: false,
      }
    );
  }

  async withdrawApplication(id: string): Promise<ApplicationDocument | null> {
    return ApplicationModel.findByIdAndDelete(id);
  }
}
