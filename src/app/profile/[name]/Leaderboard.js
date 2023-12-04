"use client";
import Image from "next/image";

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

  return (
    <>
      <ol>
        {users.map((user) =>
          user.id == pageUser.id ? (
            <li
              key={user.id}
              className="sticky bottom-0 top-0 flex gap-20 bg-slate-500"
            >
              <Image
                src={user.avatar.medium}
                alt="User Avatar"
                height="100"
                width="100"
                className="rounded-full"
              />
              <div>{user.name}</div>
              <div>
                {Math.round(user.statistics.anime.minutesWatched / 60)} Hours
              </div>
            </li>
          ) : (
            <li key={user.id} className="flex gap-20">
              <Image
                src={user.avatar.medium}
                alt="User Avatar"
                height="100"
                width="100"
                className="rounded-full"
              />
              <div>{user.name}</div>
              <div>
                {Math.round(user.statistics.anime.minutesWatched / 60)} Hours
              </div>
            </li>
          )
        )}
      </ol>
    </>
  );
};

export default Leaderboard;
