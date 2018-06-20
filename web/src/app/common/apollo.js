import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";

const env = process.env;

const apiPort =
  (env.REACT_APP_HTTP_PROTOCOL === "http" && env.REACT_APP_API_PORT === "80") ||
  (env.REACT_APP_HTTP_PROTOCOL === "https" && env.REACT_APP_API_PORT === "443")
    ? ``
    : `:${env.REACT_APP_API_PORT}`;

const apiUrl = `${env.REACT_APP_HTTP_PROTOCOL}://${
  env.REACT_APP_API_HOST
}${apiPort}/api`;

console.log(apiUrl);

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const links = [errorLink, createHttpLink({ uri: `/api/graphql` })];

export const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache
});
