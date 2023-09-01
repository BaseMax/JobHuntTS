import { injectable } from "tsyringe";
import { ApplicationInput } from "./dto/application-input";
import { ApplicationDocument } from "./entity/application-document";
import { ApplicationModel } from "./entity/application-model";

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
}
