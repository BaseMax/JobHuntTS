import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import { UserProfile } from "./entity/user-entity";
import { UpdateUserProfile } from "./dto/update-user-input";
import { GetCurrentUserId } from "../common/get-current-userId";
import { injectable } from "tsyringe";
import { UserService } from "./user-service";

@Resolver()
@injectable()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => UserProfile)
  @Authorized()
  async updateProfile(
    @Arg("input") updateUserProfile: UpdateUserProfile,
    @GetCurrentUserId() userId: string
  ) {
    return await this.userService.updateUserProfile(userId, updateUserProfile);
  }

  @Mutation(() => UserProfile)
  @Authorized()
  async deleteProfile(@GetCurrentUserId() userId: string) {
    return await this.userService.deleteUserProfile(userId);
  }

  @Mutation(() => [UserProfile], { nullable: true })
  @Authorized()
  async getUserProfiles() {
    return await this.userService.getUsers();
  }
}
