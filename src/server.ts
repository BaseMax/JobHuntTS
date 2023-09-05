import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { container } from "./container";
import { ApolloServer } from "@apollo/server";
import { ContextType } from "./context";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Request, Response } from "express";
import { logger } from "./modules/common/logger";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { AuthResolver } from "./modules/auth/auth-resolver";
import { formatError } from "./modules/common/error-formater";
import { CustomAuthChecker } from "./modules/auth/auth-checker";
import { CategoryResolver } from "./modules/category/category-resolver";
import { JobResolver } from "./modules/job/job-resolver";
import { ApplicationResolver } from "./modules/application/application-resolver";
import { UserResolver } from "./modules/user/user-resolver";
import { BookMarkResolver } from "./modules/bookMark/bookMark-resolver";
import { ReviewResolver } from "./modules/review/review-resolver";
dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

type ApolloServerInfo = {
  apolloServer: ApolloServer<ContextType>;
  url: string;
};

export async function createServer(): Promise<any> {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      CategoryResolver,
      JobResolver,
      ApplicationResolver,
      UserResolver,
      BookMarkResolver,
      ReviewResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },
    authChecker: CustomAuthChecker,
    validate: true,
  });

  const apolloServer = new ApolloServer<ContextType>({
    schema,
    formatError: formatError,
  });

  const server = await startStandaloneServer(apolloServer, {
    context: async ({ req, res }) => ({
      req: req as Request,
      res: res as Response,
    }),
  });

  logger.info(` 🚀 GraphQL server ready at: ${server.url}`);
  mongoose.connect(dbUri).then((co) => {
    logger.info(` 🚀 GraphQL server  connected to : ${dbUri}`);
  });

  return server;
}
createServer().catch((error) => {
  logger.error(error);
});
