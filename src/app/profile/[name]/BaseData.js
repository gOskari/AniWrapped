"use client";
import Image from "next/image";
import AnimeRadarChart from "./Chart.js";
import Router, { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

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
  const router = useRouter(); 

  const { loading, error, data } = useSuspenseQuery(query, {
    variables: { name: name },
  });

  if (loading) {
    return <>loading...</>;
  }

  if (!data) {
    return <>No following...</>;
  }

  if (error) {
    Router.push("/")
  }

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
            sizes="33vw"
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
      <div className="pt-10">
      <AnimeRadarChart genres={user.statistics.anime.genres} />
      </div>
    </>
  );
}
