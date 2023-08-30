import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { ContextType } from "../../context";
import { injectable } from "tsyringe";
import { JwtService } from "./jwt-service";
import { JwtPayload } from "../../interfaces/jwt-payload";

@injectable()
export class CustomAuthChecker implements AuthCheckerInterface {
  constructor(private readonly jwtService: JwtService) {}
  check(
    { root, args, context, info }: ResolverData<ContextType>,
    roles: string[]
  ): boolean | Promise<boolean> {
    const token = context.req.headers.authorization;
    if (!token) return false;

    const jwtPayload = this.jwtService.verify<JwtPayload>(token);
    context.jwtPayload = jwtPayload;
    return true;
  }
}
