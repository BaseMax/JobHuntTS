import { injectable } from "tsyringe";
import { AuthService } from "./auth-service";
import { Arg, Args, Mutation, Query } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload.";
import { SignupInput } from "./dto/signup-input";
import { LoginInput } from "./dto/login-input";

@injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { nullable: true })
  async signup(@Arg("input") signupInput: SignupInput) {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => AuthPayload, { nullable: true })
  async login(@Arg("input") loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload, { nullable: true })
  async refreshToken(@Arg("refreshToken") refreshToken: string) {
    return await this.authService.refreshTokens(refreshToken);
  }

  @Query(() => String)
  async getHello() {
    return "aks";
  }
}
