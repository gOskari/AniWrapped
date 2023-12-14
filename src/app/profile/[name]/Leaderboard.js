"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { createAniListUsers, getUsers } from "@/lib/serverLib";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { useEffect, useState, useRef } from "react";

import { useSearchParams } from "next/navigation";

const Layout = ({ user, users }) => {
  function DropDownMenu() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");
    return (
      <Menu as="div" className="relative inline-block pb-2 text-left">
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-secondary-color bg-primary-color px-4 py-2 text-sm font-medium text-secondary-color hover:border-secondary-color-dark hover:text-secondary-color-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Menu.Button>
        <Menu.Items className="left absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-primary-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {" "}
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "" : ""
                } hover:twe group flex w-full items-center rounded-md bg-primary-color px-2 py-2 text-sm text-secondary-color hover:text-secondary-color-dark`}
                href={`/profile/${user.name}?view=ranking&filter=following`}
              >
                Following
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className={`${
                  active ? "" : ""
                } group flex w-full items-center rounded-md bg-primary-color px-2 py-2 text-sm text-secondary-color hover:text-secondary-color-dark`}
                href={`/profile/${user.name}?view=ranking&filter=global`}
              >
                Global
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  }

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  let useri = user;

  const userRank = users.findIndex((u) => u.id === useri.id) + 1;
  //const userRank = 1;

  return (
    <>
      <div className="relative flex flex-col items-center justify-center">
        <h1 className="mb-5 font-semibold">Leaderboard | Hours</h1>
        <DropDownMenu className="absolute right-5" />
        {/*!filter ? <p className="mb-5">Rnk #{userRank}</p> : ""*/}
        <ul className="mx-auto flex w-full flex-col items-center space-y-6 rounded-xl bg-primary-color p-8">
          {users.map((user) => (
            <li
              key={user.id}
              className={`my-3 flex w-full rounded-lg bg-bg-color shadow-md ${
                user.id == useri.id ? "bottom-2 top-2 bg-primary-color" : ""
              }`}
            >
              <div className="relative h-14 w-14">
                <Image
                  src={user.avatar.medium}
                  alt="User Avatar"
                  fill={true}
                  className="rounded-l-lg"
                  sizes="33vw"
                />
              </div>
              <div className="flex w-full items-center justify-between pr-4">
                <Link
                  href={`/profile/${user.name}`}
                  className="ml-4 text-secondary-color hover:text-secondary-color-dark"
                >
                  {user.name}
                </Link>
                <div className="text-secondary-color-dark">
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

const Following = ({ user }) => {
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

  const { loading, error, data } = useSuspenseQuery(query, {
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

  return <Layout user={user} users={users} />;
};

const Global = ({ user }) => {
  const [users, setUsers] = useState();
  const [usersFetched, setUsersFetched] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetching = async () => {
      const page = 1;
      const pageSize = 75;

      // Check if it's not the initial mount
      if (!isInitialMount.current) {
        // Check if users have already been fetched
        if (!usersFetched) {
          // Fetch users
          let fetchedUsers = await getUsers({ page, pageSize });

          // If no users are fetched, create them
          if (fetchedUsers.length === 0) {
            await createAniListUsers();
            fetchedUsers = await getUsers({ page, pageSize });
          }

          // Update state
          setUsers(fetchedUsers);
          setUsersFetched(true); // Set the flag to true to indicate users have been fetched
        }
      } else {
        // It's the initial mount, set isInitialMount to false
        isInitialMount.current = false;
      }
    };

    fetching();
  }, [usersFetched, setUsers]);

  if (!users) {
    return <>Loading...</>;
  }

  return <Layout user={user} users={users} />;
};

const Leaderboard = ({ user }) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  if (filter == "following") {
    return <Following user={user} />;
  }

  if (filter == "global") {
    return <Global user={user} />;
  }

  return <Following user={user} />;
};

export default Leaderboard;
