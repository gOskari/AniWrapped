"use client"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

// Create an Apollo Client instance for client-side rendering
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
    fetchOptions: { cache: "force-cache" },
  }),
  cache: new InMemoryCache(),
  onError: ({ graphQLErrors, networkError }) => {
    console.log('got error.....')
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        console.error("GraphQL Errorr:", error);
        // Handle GraphQL errors globally, if needed
      });
    }

    if (networkError) {
      console.error("Network Errorr:", networkError);
      // Handle network errors globally, if needed
    }
  },
  
});

// Wrap your entire app with the ApolloProvider to make the client available to your components
export function ApolloWrapper({ children }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}