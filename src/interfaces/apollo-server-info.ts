import { ApolloServer } from "@apollo/server";
import { ContextType } from "../context";

type ApolloServerInfo = {
  apolloServer: ApolloServer<ContextType>;
  url: string;
  mongooseConnection: any;
};
