"use client";
import Image from "next/image";
import { Menu } from "@headlessui/react";

import Leaderboard from "./Leaderboard";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

// revalidatio ei toimi ehk
const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  fetchOptions: {
    next: { revalidate: 5 },
  },
});

const FetchHook = ({ name }) => {
  const query = gql`
    query ($name: String) {
      User(name: $name) {
        id
        name
        avatar {
          large
          medium
        }
        statistics {
          anime {
            count
            minutesWatched
            genres {
              genre
              count
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    client,
    variables: { name: name },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>No data...</>;
  }

  return <Leaderboard user={data.User}/>;
};

export default FetchHook;
