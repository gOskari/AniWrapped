"use client"

import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AnimeRadarChart from "./Chart.js";
import BaseData from "./BaseData.js";
import Nav from "./Nav.js";
import FetchHook from "./FetchHook.js"
import CompareButton from "./CompareButton.js";
import CompareStats from "./CompareStats.js";

export default function Page({ params }) {
  const name = params.name;

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  if (view == "ranking") {
    return (
      <>
        <div className="m-10 flex flex-col items-center gap-20">
          <div className="w-full">
            <Nav name={name} />
          </div>
          <div className="h-">
            <FetchHook name={name}/>
          </div>
        </div>
      </>
    );
  }
  
  if (view == "compare") {
    return (
      <>
        <div className="m-10 flex flex-col items-center gap-20">
          <div className="w-full">
            <Nav name={userData.name} />
          </div>
          <div className="h-">
          <CompareStats id1={userData.id} id2={128119}/>
          </div>
        </div>
      </>
    );
  }

  console.log(userData.id)

  return (
    <>
      <div className="m-10 flex flex-col items-center">
        <div className="w-full">
          <Nav name={name} />
        </div>
        <div className="w-full mt-10">
          <BaseData name={name} />
        </div>
        <div className="h-96 w-4/5 p-10">
          {/*AnimeRadarChart genres={userData.genres} />*/}
        </div>
        {/*findPositionBinary(users, userData.anime_minutesWatched)*/}
        <CompareStats id1={1} id2={128119}/>
      </div>
      <div className=""></div>
    </>
  );
}
