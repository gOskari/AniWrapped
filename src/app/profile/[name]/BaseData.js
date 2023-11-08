"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

export default function BaseData({
  dator,
  name,
  queryAniListAndSaveDataToServer,
}) {
  const [data, setData] = useState(dator);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await queryAniListAndSaveDataToServer(name);
      console.log("PII PIIP", response);

      if (response) {
        setData(response);
        setLoading(false);
      }
    };

    if (!data) {
      fetchData().catch(console.error);
    } else {
      setLoading(false);
    }
  }, [data, name, queryAniListAndSaveDataToServer]);

  return loading === true ? (
    skele
  ) : (
    <>
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="">
          <Image
            src={data.avatar}
            alt="User Avatar"
            height="100"
            width="100"
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl">{data.name}</h1>
        </div>
        <div className="text-2xl">
          <div className="flex gap-10 justify-between">
            <span>Anime</span>
            <span>{data.anime_count}</span>
          </div>
          <div className="flex gap-10 justify-between">
            <span>Hours</span>
            <span>{Math.round(data.anime_minutesWatched / 60, 2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
