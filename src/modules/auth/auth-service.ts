import { injectable } from "tsyringe";
import { UserService } from "../user/user-service";
import { SignupInput } from "./dto/signup-input";
import { AuthPayload } from "./entity/auth-payload.";
import jwt from "jsonwebtoken";
import { JwtService } from "./jwt-service";
import { JwtPayload } from "../../interfaces/jwt-payload";
import { LoginInput } from "./dto/login-input";
import * as argon2 from "argon2";
import { GraphQLError } from "graphql";

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

  async login(loginInput: LoginInput): Promise<AuthPayload | null> {
    const user = await this.userService.findByEmail(loginInput.email);

    if (!user || !(await argon2.verify(user.password, loginInput.password)))
      throw new GraphQLError("credentials aren't correct.");

    const jwtPayload: JwtPayload = { name: user.name, sub: user._id };
    const tokens = this.jwtService.signTokens(jwtPayload);
    await this.userService.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      name: user.name,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<AuthPayload | null> {
    const jwtPayload = this.jwtService.verify<JwtPayload>(refreshToken);

    const newJwtPayload: JwtPayload = {
      name: jwtPayload.name,
      sub: jwtPayload.sub,
    };
    const tokens = this.jwtService.signTokens(newJwtPayload);
    await this.userService.updateRefreshToken(
      jwtPayload.sub,
      tokens.refreshToken
    );

    return {
      name: jwtPayload.name,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
