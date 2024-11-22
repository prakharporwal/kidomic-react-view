import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PROD_API + "/graphql",
  cache: new InMemoryCache(),
});

export { client as apolloClient };
