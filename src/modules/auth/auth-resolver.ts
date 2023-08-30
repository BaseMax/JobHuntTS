import { injectable } from "tsyringe";
import { AuthService } from "./auth-service";
import { Arg, Args, Mutation, Query } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload.";
import { SignupInput } from "./dto/signup-input";

@injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload, { nullable: true })
  async signup(@Arg("input") signupInput: SignupInput) {
    return this.authService.signup(signupInput);
  }

  @Query(() => String)
  async getHello() {
    return "aks";
  }
}
