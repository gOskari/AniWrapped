"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    console.log("Anilist query succesful");
    return res;
  } catch {
    console.log("Failed Anilist query; returned null.");
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

export default function BaseData({ pageUserData, pageUserName }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { User } = await getAniList(pageUserName) || {};

      // ANILIST FAIL
      if (!User) {
        console.log('AniList returned null. Back to "/"')
        router.push('/');
        return;
      }

      const user = {
        name: User.name || "fallback",
        avatar: User.avatar.large || "fallback",
        anime_count: User.statistics.anime.count || 0,
        anime_minutesWatched: User.statistics.anime.minutesWatched || 0,
        genres: User.statistics.anime.genres || [
          { count: 1, genre: "a" },
          { count: 1, genre: "b" },
          { count: 1, genre: "c" },
          { count: 1, genre: "d" },
          { count: 1, genre: "e" },
        ],
      };

      const savedUser = await saveUser(user);

      if (savedUser) {
        setUserData(savedUser);
        setLoading(false);
      } else {
        console.log("Saving user failed.");
      }
    };

    if (!pageUserData) {
      fetchData();
    } else {
      setUserData(pageUserData);
      setLoading(false);
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return skele;
  }

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
