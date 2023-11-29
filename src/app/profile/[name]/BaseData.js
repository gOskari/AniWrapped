"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
//import { useRouter } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { findPositionBinary } from "../../db/db.js";
import AnimeRadarChart from "../../Chart.js";
import { queryAniListAndSaveDataToServer } from "./clientComponent.js";

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

const areDatetimes10MinutesApart = (datetime1, datetime2) => {
  const diffInMilliseconds = Math.abs(datetime1 - datetime2);
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  return diffInMinutes >= 10;
};

export default function BaseData({
  name,
//  users,
}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUserData?name=${encodeURIComponent(name)}`, { cache:'no-store' });

        if (!response.ok) {
          console.log("Error Response:", await response.text());
          throw new Error("Network response was not ok");
        }

        const user = await response.json();

        // CHECK IF DATA IS OLD
        if (areDatetimes10MinutesApart(user.updatedAt, new Date())) {
          console.log("The datetimes are 10 minutes apart.");
          
          // DELETE
          const res = await fetch(process.env.URL + `/api/deleteUserData`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }),
            cache: 'no-store',
          });

          // REFETCH
          const res2 = await queryAniListAndSaveDataToServer(name);
          setUserData(res2.json());

        } else {
          console.log("The datetimes are NOT 10 minutes apart.");
          setUserData(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);

        try {
          const secondResponse = await queryAniListAndSaveDataToServer(name);

          if (!secondResponse) {
            throw new Error("Network response no work");
          }

          const secondData = await secondResponse;
          setUserData(secondData);
        } catch (secondError) {
          console.error(
            "Error fetching data in the second attempt:",
            secondError.message
          );
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return skele;
  }

  if (!userData) {
    return <p>Error fetching user data</p>;
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
        {/*<div>{findPositionBinary(users, userData.anime_minutesWatched)}</div> */}
      </div>
      <div className="h-96 w-4/5 p-10">
        <AnimeRadarChart genres={userData.genres} />
      </div>
    </>
  );
}
