import { gql } from "apollo-server";

export default gql`
  type Movie {
    id: Int!
    createdAt: String!
    updatedAt: String!
    year: Int!
    genre: String
    title: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;
