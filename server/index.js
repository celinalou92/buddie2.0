import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { schemas } from "./schemas/index.js";
import { authMiddleware } from "./utils/auth.js";
import { runDBClient } from "./connection/index.js";

const app = express();
export const httpServer = http.createServer(app);
const { typeDefs, resolvers } = schemas;
const PORT = process.env.PORT || 8080;
let initTime = new Date().getTime();

const httpServerListen = () => {
  return new Promise((resolve) => {
    if (!PORT) {
      throw new Error("No Port Set!");
    }
    httpServer.listen({ port: PORT }, resolve);
  });
};

const StartApolloServer = async () => {
  console.log(`Starting Apollo Server`);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start().catch((error) => console.log(error.message));
  
  app.use(
    "/",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

let loadTime = new Date().getTime();
let timeToLoad = loadTime - initTime;
  console.log("----------------",timeToLoad)
  console.log("🚀 Apollo Server ready at port: ", PORT);
};

await runDBClient();
await StartApolloServer();
await httpServerListen()

export default StartApolloServer;