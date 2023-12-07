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

export default function BaseData({ name }) {
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

  //name = 'moi';

  const { loading, error, data } = useQuery(query, {
    client,
    variables: { name: name },
  });

  if (!data) {
    return <>No following...</>;
  }

  console.log(data);

  const user = data.User;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="">
          <Image
            src={user.avatar.large}
            alt="User Avatar"
            height="100"
            width="100"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-2xl">{user.name}</h1>
        </div>
        <div className="">
          <div className="flex justify-between gap-10">
            <span>Anime</span>
            <span className="text-secondary-color">{user.statistics.anime.count}</span>
          </div>
          <div className="flex justify-between gap-10">
            <span>Hours</span>
            <span className="text-secondary-color">
              {Math.round(user.statistics.anime.minutesWatched / 60, 2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
