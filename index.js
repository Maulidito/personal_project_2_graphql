const { ApolloServer, gql } = require("apollo-server");
const express = require("express");
const { authGraphql } = require("./middleware/auth");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("sync Success");
  })
  .catch((err) => {
    console.log("sync Failed", err);
  });

const {
  RepositoryNews,
  RepositoryUser,
  RepositoryComment,
  LoginUser,
  RegisUser,
} = require("./service");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    news: async () => {
      const dataNews = await RepositoryNews.getAll();
      return dataNews;
    },
    comment: async () => {
      const result = await RepositoryComment.getAll();
      return result;
    },
  },
  Mutation: {
    Login: async (_, data) => {
      let res = await LoginUser(data.email, data.password);
      return res.token;
    },
    Regis: async (_, data) => {
      let res = await RegisUser(data.email, data.password);
      return res;
    },
    createNews: async (_, data) => {
      let res = await RepositoryNews.Add(data);
      return res;
    },
    getoneNews: async (_, data) => {
      let res = await RepositoryNews.GetOne(data.id);
      return res;
    },
    updateNews: async (_, data) => {
      await authGraphql(data.token);
      let res = await RepositoryNews.Update(data);
      return res;
    },
    deleteNews: async (_, data) => {
      await authGraphql(data.token);
      let res = await RepositoryNews.Delete(data.id);
      return res;
    },
    createComment: async (_, data) => {
      let res = await RepositoryComment.Add(data);
      return res;
    },
  },
};

const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const { readFileSync } = require("fs");

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync(require.resolve("./schema.graphql")).toString(
  "utf-8"
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

//server.applyMiddleware({ app });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
