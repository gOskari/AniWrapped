"use client";
import Image from "next/image";
import { Menu } from '@headlessui/react'

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

const Leaderboard = ({ id, pageUser }) => {
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
    variables: { param: id },
  });

  if (!data) {
    return <>No following...</>;
  }

  let users = data.Page.following;

  const addUser = {
    id: pageUser.id,
    name: pageUser.name,
    avatar: {
      medium: pageUser.avatar,
    },
    statistics: {
      anime: {
        minutesWatched: pageUser.anime_minutesWatched,
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
      <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-red-500 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Filter
      </Menu.Button>
      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${
                active ? 'bg-gray-100' : ''
              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
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
                active ? 'bg-gray-100' : ''
              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
              href="idkyet"
            >
              Something else prob
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
    )
  }

  return (
    <>
      <div className="relative">
        <DropDownMenu className="absolute right-5"/>
        <ul className="mx-auto max-w-2xl space-y-6">
          {users.map((user) => (
            <li
              key={user.id}
              className="my-3 flex items-center justify-between rounded-lg bg-red-500 w-96 px-6 py-4 shadow-md"
            >
              <Image
                src={user.avatar.medium}
                alt="User Avatar"
                height="50"
                width="50"
                className="rounded-full"
              />
              <div className="ml-4 flex-1">{user.name}</div>
              <div>
                {Math.round(user.statistics.anime.minutesWatched / 60)} Hours
              </div>
            </li>
          ))}
        </ul>
        </div>
    </>
  );
};

export default Leaderboard;
