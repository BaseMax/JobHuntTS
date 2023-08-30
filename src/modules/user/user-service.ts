import { injectable } from "tsyringe";
import { ICreateUserInput } from "../../interfaces/create-user-input";
import { UserDocument } from "./entity/user-document";
import { UserModel } from "./entity/user-model";
import * as argon2 from "argon2";

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
}
