"use client";
import Image from "next/image";
import { useEffect, useState, } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await queryAniListAndSaveDataToServer(name);
        if (response) {
          setData(response);
          setLoading(false);
        } else {
          // Handle case when response is null
          setLoading(false);
          router.push("/");
        }
      } catch (error) {
        console.error(error);
        router.push('/')
      }
    };
  
    if (!data) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [data, name, queryAniListAndSaveDataToServer, router]);

  return loading ? (
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
            <span className="text-secondary-color">{data.anime_count}</span>
          </div>
          <div className="flex gap-10 justify-between">
            <span>Hours</span>
            <span className="text-secondary-color">{Math.round(data.anime_minutesWatched / 60, 2)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
