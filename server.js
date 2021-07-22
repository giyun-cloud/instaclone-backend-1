require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;
async function startApolloServer(typeDefs, resolvers) {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.token),
    }),
  });
  await apollo.start();
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
