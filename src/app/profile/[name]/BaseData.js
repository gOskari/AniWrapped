"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
//import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimeRadarChart from "../../Chart.js";
import { request, gql } from "graphql-request";
import { saveUser } from "@/lib/db.ts";

const getAniList = async (name) => {
  const query = gql`
    query ($id: Int, $name: String) {
      User(id: $id, name: $name) {
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
  console.log("Queried AniList.");
  try {
    const res = await request("https://graphql.anilist.co", query, {
      name: name,
    });
    return res;
  } catch {
    return null;
  }
};

const skele = (
  <SkeletonTheme baseColor="#0B1622" highlightColor="#151F2E">
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="">
          <Skeleton circle width={100} height={100} duration={2} />
        </div>
        <div>
          <h1 className="text-3xl">
            <Skeleton width={150} height={45} />
          </h1>
        </div>
        <div className="text-2xl">
          <div className="flex gap-10 justify-between">
            <span>
              <Skeleton width={300} height={35} />
            </span>
          </div>
          <div className="flex gap-10 justify-between">
            <span>
              <Skeleton width={300} height={35} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

const queryAniListAndSaveDataToServer = async (name) => {
  const res = await getAniList(name);

  if (!res) {
    return null;
  }

  console.log("toine", await res.User);

  const resUser = await res.User;

  const user = {
    name: resUser.name || "fallback",
    avatar: resUser.avatar.large || "fallback",
    anime_count: resUser.statistics.anime.count || 0,
    anime_minutesWatched: resUser.statistics.anime.minutesWatched || 0,
    genres: resUser.statistics.anime.genres || [
      { count: 1, genre: "a" },
      { count: 1, genre: "b" },
      { count: 1, genre: "c" },
      { count: 1, genre: "d" },
      { count: 1, genre: "e" },
    ],
  };

  const res2 = await saveUser(user);

  if (res2) {
    console.log("Data sent");
    return res2;
  } else {
    console.log("Data not sent:");
    return null;
  }
};

export default function BaseData({ pageUserData, pageUserName }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const res = await queryAniListAndSaveDataToServer(pageUserName);
      if (res) {
        setUserData(res);
        setLoading(false);
      }
    };

    if (!pageUserData) {
      fetchData();
    } else {
      setUserData(pageUserData);
      setLoading(false);
    }
  }, [pageUserData, pageUserName]); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return skele;
  }

  console.log(userData);

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="">
          <Image
            src={userData.avatar}
            alt="User Avatar"
            height="100"
            width="100"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl">{userData.name}</h1>
        </div>
        <div className="text-2xl">
          <div className="flex gap-10 justify-between">
            <span>Anime</span>
            <span className="text-secondary-color">{userData.anime_count}</span>
          </div>
          <div className="flex gap-10 justify-between">
            <span>Hours</span>
            <span className="text-secondary-color">
              {Math.round(userData.anime_minutesWatched / 60, 2)}
            </span>
          </div>
        </div>
      </div>
      <div className="h-96 w-4/5 p-10">
        <AnimeRadarChart genres={userData.genres} />
      </div>
    </>
  );
}
