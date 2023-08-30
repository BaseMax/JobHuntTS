import { injectable } from "tsyringe";
import { UserService } from "../user/user-service";
import { SignupInput } from "./dto/signup-input";
import { AuthPayload } from "./entity/auth-payload.";
import jwt from "jsonwebtoken";
import { JwtService } from "./jwt-service";
import { JwtPayload } from "../../interfaces/jwt-payload";
@injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupInput: SignupInput): Promise<AuthPayload | null> {
    const existsUser = await this.userService.findByEmail(signupInput.email);

    if (existsUser) throw new Error("an account with this email exists...");

    const user = await this.userService.create(signupInput);
    const jwtPayload: JwtPayload = { name: user.name, sub: user._id };
    const tokens = this.jwtService.signTokens(jwtPayload);
    await this.userService.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      name: user.name,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
