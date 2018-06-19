import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

const env = process.env;

const apiPort =
  (env.REACT_APP_HTTP_PROTOCOL === "http" && env.REACT_APP_API_PORT === "80") ||
  (env.REACT_APP_HTTP_PROTOCOL === "https" && env.REACT_APP_API_PORT === "443")
    ? ``
    : `:${env.REACT_APP_API_PORT}`;

const apiUrl = `${env.REACT_APP_HTTP_PROTOCOL}://${env.REACT_APP_API_HOST}${apiPort}/api`;

console.log(apiUrl);

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});

export const client = new ApolloClient({
  link: createHttpLink({ uri: `/api/graphql` }),
  cache
});
