const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const moesif = require('moesif-nodejs');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.

//For Apollo Server Express 3.0 and above, you need to define an async function that takes in typeDefs and resolvers parameters, then assign the server to the same Apollo initialization
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  const moesifOptions = {
    applicationId: 'Your Moesif Application Id',
  };
  const moesifMiddleware = moesif(moesifOptions);
  app.use(moesifMiddleware);

  await server.start();
  server.applyMiddleware({ app });
  const port = 6868;
  app.listen({ port }, () => {
    console.log(`Server is listening on port ${port}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
