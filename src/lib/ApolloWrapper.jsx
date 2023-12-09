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
});

// Wrap your entire app with the ApolloProvider to make the client available to your components
export function ApolloWrapper({ children }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}