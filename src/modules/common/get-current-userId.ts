import { createParamDecorator } from "type-graphql";
import { ContextType } from "../../context";

export function GetCurrentUserId() {
  return createParamDecorator<ContextType>(
    ({ context }) => context.jwtPayload?.sub
  );
}
