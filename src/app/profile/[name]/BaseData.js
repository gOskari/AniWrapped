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

  const router = useRouter();

  const { loading, error, data } = useSuspenseQuery(query, {
    variables: { name: name },
  });

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    console.log("ERROR");
    // Check if the error is a "Not Found" error
    if (error.networkError && error.networkError.statusCode === 404) {
      // Handle the "Not Found" error, for example, redirect to a 404 page
      router.push("/404");
    } else {
      // Handle other errors, you might want to log them for debugging
      console.error("GraphQL error:", error);
      // Redirect to the home page or another appropriate page
      router.push("/");
    }
  }

  const user = data.User;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col items-center justify-center gap-10 rounded-xl bg-primary-color p-8">
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
              <span className="text-secondary-color-dark">
                {user.statistics.anime.count}
              </span>
            </div>
            <div className="flex justify-between gap-10">
              <span>Hours</span>
              <span className="text-secondary-color-dark">
                {Math.round(user.statistics.anime.minutesWatched / 60, 2)}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-primary-color rounded-xl">
          <AnimeRadarChart genres={user.statistics.anime.genres} />
        </div>
      </div>
    </>
  );
}
