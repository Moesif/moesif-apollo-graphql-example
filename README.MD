# Moesif Apollo GraphQl Example


[Moesif](https://www.moesif.com) is the most advanced API analytics platform with native [support for GraphQl](https://www.moesif.com/docs/platform/graphql/).

[Apollo](https://www.apollographql.com/) is one of the most popular frameworks for creating and using [GraphQL](https://graphql.org/learn/) in the node ecosystem.

This example builds upon the [get started example](https://www.apollographql.com/docs/apollo-server/essentials/server.html#middleware) from the official guide on Apollo's website to demonstrate how you can set up Moesif quickly using the [moesif express](https://www.moesif.com/docs/server-integration/express/) middleware.


## Summary of Key Changes

Apollo sever works with any express app. When you set up Apollo with express, you can simply add the moesif-express
middleware. Below summarizes the code needed. See index.js from this package for details.

```javascript
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const moesifExpress = require('moesif-express');

// ...

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

const moesifOptions = {
  applicationId: 'replace with your moesif application id'
};

const moesifMiddleware = moesifExpress(moesifOptions);

// this adds moesif middleware to express app.
app.use(moesifMiddleware);

// this adds apollo server to the express app.
server.applyMiddleware({ app });

app.listen({ port: 6868 });

```


## To run this example:

- open up `index.js` and replace application id with the application id obtained from Moesif.
- run `npm install` to install all dependencies.
- start the app `node index.js`
- use browser to navigate to `http://localhost:6868/graphql`
- run some test queries, for example:

```
query {
  books { title }
}

```

You should see the GraphQL request captured in your Event Stream, it is where it will show up first.

## Notes:

- You'll notice other requests besides GraphQL are captured also. That is ok and expected, since moesif-express
works at a lower level than GraphQL. You can change this default by modify the skip option of moesif-express.
- If you are using Apollo to create a wrapper around other restful APIs, you may consider capture all outgoing API calls so you get the big pictures of how everything is connected:

```javascript
moesifMiddleware.startCaptureOutgoing();

```
- Go to [moesif-express](https://github.com/Moesif/moesif-express) SDK documentation for more configuration options.
- For more information on what you can do with [API analytics for GraphQL check out here](https://www.moesif.com/docs/platform/graphql/).