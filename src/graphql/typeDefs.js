import { gql } from "apollo-server-express";
import { readFileSync } from "fs";
import path from "path";

const schema = readFileSync(path.join(__dirname, "../../schema.graphql"), {
  encoding: "utf8",
});

export const typeDefs = gql(schema);
