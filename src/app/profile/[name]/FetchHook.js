"use client";
import Image from "next/image";
import { Menu } from "@headlessui/react";

import Leaderboard from "./Leaderboard";

import { gql } from "@apollo/client";

import { Suspense } from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

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

  const { loading, error, data } = useSuspenseQuery(query, {
    variables: { name: name },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>No data...</>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Leaderboard user={data.User} />
    </Suspense>
  );
};

export default FetchHook;
