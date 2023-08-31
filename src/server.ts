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
dotenv.config();

const port = process.env.Port || 3000;
const dbUri = process.env.DATABASE_URI as string;

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [AuthResolver, CategoryResolver, JobResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    container: { get: (cls) => container.resolve(cls) },
    authChecker: CustomAuthChecker,
    validate: true,
  });

  const apolloServer = new ApolloServer<ContextType>({
    schema,
    formatError: formatError,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    context: async ({ req, res }) => ({
      req: req as Request,
      res: res as Response,
    }),
  });

  logger.info(` 🚀 GraphQL server ready at: ${url}`);
  mongoose.connect(dbUri).then((co) => {
    logger.info(` 🚀 GraphQL server  connected to : ${dbUri}`);
  });

  return { apolloServer, url, mongooseConnection: "" };
}
createServer().catch((error) => {
  logger.error(error);
});
