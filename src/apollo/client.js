import ApolloClient from "apollo-boost"
import fetch from "cross-fetch"

export const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  fetch,
})
