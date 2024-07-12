//Apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL = "";

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const Graph = (queryBody: string) => gql(queryBody);
