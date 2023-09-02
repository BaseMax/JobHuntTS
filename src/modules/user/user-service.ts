import { injectable } from "tsyringe";
import { ICreateUserInput } from "../../interfaces/create-user-input";
import { UserDocument } from "./entity/user-document";
import { UserModel } from "./entity/user-model";
import * as argon2 from "argon2";
import { UpdateUserProfile } from "./dto/update-user-input";

@injectable()
export class UserService {
  async create(createUserInput: ICreateUserInput): Promise<UserDocument> {
    return UserModel.create({
      ...createUserInput,
      password: await argon2.hash(createUserInput.password),
    });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({
      email: email,
    });
  }
  async updateRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(userId, {
      $set: { refreshToken: await argon2.hash(refreshToken) },
    });
  }

  async updateUserProfile(
    userId: string,
    updateUserProfile: UpdateUserProfile
  ): Promise<UserDocument | null> {
    console.log(userId);

    const data: any = {};
    if (updateUserProfile.name) {
      data.name = updateUserProfile.name;
    }

    if (updateUserProfile.password) {
      data.password = await argon2.hash(updateUserProfile.password);
    }
    data.refreshToken = null;
    return UserModel.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },

      {
        returnOriginal: false,
      }
    );
  }

  async getUsers(): Promise<UserDocument[]> {
    return UserModel.find();
  }

  async deleteUserProfile(userId: string): Promise<UserDocument | null> {
    return await UserModel.findByIdAndDelete(userId);
  }
}
