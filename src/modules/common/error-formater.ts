import { GraphQLError, GraphQLFormattedError } from "graphql";
import { logger } from "./logger";
import { unwrapResolverError } from "@apollo/server/errors";
import { ArgumentValidationError } from "type-graphql";
import type { ValidationError as ClassValidatorValidationError } from "class-validator";

type IValidationError = Pick<
  ClassValidatorValidationError,
  "property" | "value" | "constraints" | "children"
>;

export function formatError(error: any): GraphQLFormattedError {  
  let originalError = unwrapResolverError(error);
  let validationMessages;
  if (error.message === "Argument Validation Error") {
    const validationErrors: IValidationError[] = (error.extensions as any)
      .validationErrors;

    validationMessages = validationErrors.map(formatValidationErrors);
  }

  const graphQLFormattedError: GraphQLFormattedError = {
    message:
      validationMessages ||
      (error?.extensions.originalError as any)?.message ||
      (error?.extensions?.exception as any)?.response?.message ||
      error?.message,
  };

  return graphQLFormattedError;
}

function formatValidationErrors(
  validationError: IValidationError
): IValidationError {
  return {
    property: validationError.property,
    ...(validationError.value && { value: validationError.value }),
    ...(validationError.constraints && {
      constraints: validationError.constraints,
    }),
    ...(validationError.children &&
      validationError.children.length !== 0 && {
        children: validationError.children.map((child) =>
          formatValidationErrors(child)
        ),
      }),
  };
}
