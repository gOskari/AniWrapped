"use client";
import Image from "next/image";
import { Menu } from "@headlessui/react";


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



//import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

//import { gql } from "@apollo/client";

const Leaderboard = ({ user }) => {

  const query = gql`
    query ($param: Int!) {
      Page(page: 1, perPage: 50) {
        following(userId: $param, sort: WATCHED_TIME_DESC) {
          id
          name
          avatar {
            medium
          }
          statistics {
            anime {
              minutesWatched
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    client,
    variables: { param: user.id },
  });

  if (!data) {
    return <>No following...</>;
  }

  let users = data.Page.following;

  const addUser = {
    id: user.id,
    name: user.name,
    avatar: {
      medium: user.avatar.medium,
    },
    statistics: {
      anime: {
        minutesWatched: user.statistics.anime.minutesWatched,
      },
    },
  };

  users = users.concat(addUser);

  users = users.sort(
    (a, b) =>
      b.statistics.anime.minutesWatched - a.statistics.anime.minutesWatched
  );

  if (loading) {
    return <>Loading...</>;
  }

  function DropDownMenu() {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          Filter
        </Menu.Button>
        <Menu.Items className="absolute left z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                href="idkyet"
              >
                Hours Watched
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                href="idkyet"
              >
                Something else prob
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center w-10/12">
        <DropDownMenu className="absolute right-5" />
        <ul className="mx-auto space-y-6 flex flex-col w-full items-center">
          {users.map((user) => (
            <li
              key={user.id}
              className="my-3 flex rounded-lg w-full bg-red-500 shadow-md"
            >
              <div className="relative h-14 w-14">
                <Image
                  src={user.avatar.medium}
                  alt="User Avatar"
                  fill={true}
                  className=""
                />
              </div>
              <div className="flex items-center">
                <div className="ml-4 flex">{user.name}</div>
                <div className="absolute right-4">
                  {Math.round(user.statistics.anime.minutesWatched / 60)} Hours
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Leaderboard;
