import { ApolloServer, gql } from "apollo-server";

const movies = [
  {
    title: "hello",
    year: 2021,
  },
];

const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (_, { id }) => {
      const result = movies.filter((m, i) => i === id);
      return result[0];
    },
  },
  Mutation: {
    createMovie: (_, { title }) => {
      movies.push({ title });
      return true;
    },
    deleteMovie: (_, { title }) => {
      const result = movies.filter((m) => m.title !== title);
      movies = result;
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));
