import React from "react"

import { ApolloProvider } from "@apollo/react-hooks"
import { client } from "./client"
import Header from "../components/Header"

export const wrapRootElement = ({ element }) => (
  <div className="container">
    <Header />
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </div>
)
