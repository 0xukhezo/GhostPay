//Apollo
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const API_URL =
  "https://api.studio.thegraph.com/query/80878/prueba1/version/latest";

export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export const Graph = (queryBody: string) => gql(queryBody);
