import { injectable } from "tsyringe";
import { AuthService } from "./auth-service";
import { Mutation, Query } from "type-graphql";
import { AuthPayload } from "./entity/auth-payload.";

@injectable()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signup() {
    return { name: "!@1", token: "ljajsd" };
  }

  @Query(() => String)
  async getHello() {
    return "aks"
  }
}
