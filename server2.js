async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({
      req: {
        headers: { token },
      },
    }) => ({
      loggedInUser: await getUser(token),
    }),
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
