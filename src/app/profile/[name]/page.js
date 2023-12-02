"use client";

import { useEffect, useState } from "react";
import { unstable_cache } from "next/cache";
import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AnimeRadarChart from "./Chart.js";
import BaseData from "./BaseData.js";
import Nav from "./Nav.js";
import Leaderboard from "./Leaderboard.js";

import { getAniList, findPositionBinary } from "@/lib/lib";
import {
  deleteUser,
  getUser,
  createAniListUsers,
  getUsers,
  saveUser,
} from "@/lib/serverLib";

const skele = (
  <SkeletonTheme baseColor="#0B1622" highlightColor="#151F2E">
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="">
          <Skeleton circle width={100} height={100} duration={2} />
        </div>
        <div>
          <h1 className="text-3xl">
            <Skeleton width={150} height={45} />
          </h1>
        </div>
        <div className="text-2xl">
          <div className="flex justify-between gap-10">
            <span>
              <Skeleton width={300} height={35} />
            </span>
          </div>
          <div className="flex justify-between gap-10">
            <span>
              <Skeleton width={300} height={35} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export default function Page({ params }) {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState(null);
  //const [view, setView] = useState('');

  const [loading, setLoading] = useState(true);
  const name = params.name;

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  useEffect(() => {
    const fetchData = async () => {
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      const users = await getUsers();
      setUsers(users);

      /* Haluu olla retu eikä toimi
      const getCachedUser = unstable_cache(
        async (name) => getUser(name),
        getRandomInt(10000),
        {revalidate: 1}
      );
    
      const user = await getCachedUser(name);
      */

      const user = await getUser(name);

      if (user) {
        console.log("User found from server.");
        //createAniListUsers();

        // CHECK IF DATA IS 10 MINUTES OLD
        if (
          Math.abs(new Date(user.updatedAt) - new Date()) / (1000 * 60) >=
          10
        ) {
          console.log("The datetimes are 10 minutes apart.");

          // DELETE OLD DATA
          await deleteUser(name);
        } else {
          console.log("The datetimes are NOT 10 minutes apart.");
          setUserData(user);
          setLoading(false);
          return;
        }
      }

      const { User } = (await getAniList(name)) || {};

      // ANILIST FAIL
      if (!User) {
        console.log('AniList returned null. Back to "/"');
        router.push("/");
        return;
      }

      const savedUser = await saveUser(User);

      if (savedUser) {
        setUserData(savedUser);
        setLoading(false);
      } else {
        console.log("Saving user failed.");
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return skele;
  }

  console.log(view);
  if (view == "ranking") {
    return (
      <>
        <div className="m-10 flex h-screen flex-col items-center gap-20 bg-white">
          <div className="w-full bg-blue-200">
            <Nav name={userData.name} />
          </div>
          <div>
            <Leaderboard id={userData.id} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="m-10 flex h-screen flex-col items-center bg-white">
        <div className="w-full bg-blue-200">
          <Nav name={userData.name} />
        </div>
        <div className="w-full bg-red-100">
          <BaseData userData={userData} />
        </div>
        <div className="h-96 w-4/5 p-10">
          <AnimeRadarChart genres={userData.genres} />
        </div>
        {findPositionBinary(users, userData.anime_minutesWatched)}
      </div>
    </>
  );
}
