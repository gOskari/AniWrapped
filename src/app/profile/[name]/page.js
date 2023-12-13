"use client";

import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AnimeRadarChart from "./Chart.js";
import BaseData from "./BaseData.js";
import Nav from "./Nav.js";
import FetchHook from "./FetchHook.js";
import CompareButton from "./CompareButton.js";
import CompareStats from "./CompareStats.js";

import ErrorBoundary from "../../ErrorBoundary.js"

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
          <div className="flex items-center justify-center bg-primary-color p-8 rounded-xl">
            <FetchHook name={name} />
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
            <Nav name={name} />
          </div>
          <div className="bg-primary-color p-8 rounded-xl">
            <CompareStats id1={1} id2={128119} />
          </div>
        </div>
      </>
    );
  }

  return (
    <ErrorBoundary>
      <div className="m-10 flex flex-col items-center gap-20">
        <div className="w-full">
          <Nav name={name} />
        </div>
        <div className="w-full">
          <BaseData name={name} />
        </div>
        {/*findPositionBinary(users, userData.anime_minutesWatched)*/}
      </div>
      <div className=""></div>
    </ErrorBoundary>
  );
}
