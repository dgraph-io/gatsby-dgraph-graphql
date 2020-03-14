module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "DGRAPH",
        fieldName: "dgraph",
        url: "http://localhost:8080/graphql",
        refetchInterval: 60,
      },
    },
  ],
}
