const express = require('express');
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { typeDefs, resolvers } = require("./schemas")
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const { authMiddleware } = require("./utils/auth")

const PORT = process.env.PORT || 3001;
const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

// app.use(routes);

db.once('open', async () => {
  await apolloServer.start()

  app.use("/graphql", expressMiddleware(apolloServer, {
    context: authMiddleware
  }))

  app.listen(PORT, () => {
    console.log(`🌍 Express listening on http://localhost:${PORT}`)
    console.log(`GraphQL available at http://localhost:${PORT}/graphql`)
  });
});
