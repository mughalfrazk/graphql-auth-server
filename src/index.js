import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  const app = express();
  app.use(cors());

  // Apollo Server Connection
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });

  // MongoDB Connection
  await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // App Listen
  app.listen({ port: 4000 }, () =>
    console.log(`Server is ready at localhost:4000${server.graphqlPath}`)
  );
};

startServer();
