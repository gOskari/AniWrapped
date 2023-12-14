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

import ErrorBoundary from "../../ErrorBoundary.js";

import { useState } from "react";

export default function Page({ params }) {
  const name = params.name;

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [id2, setId2] = useState(""); // State to store id2
  const [id22, setId22] = useState(""); // State to store id2

  if (view == "ranking") {
    return (
      <>
        <div className="m-10 flex flex-col items-center gap-20">
          <div className="w-full">
            <Nav name={name} />
          </div>
          <div className="w-full items-center justify-center">
            <FetchHook name={name} />
          </div>
        </div>
      </>
    );
  }

  const handleId2Input = () => {
    // Validate input if needed
    if (id2.trim() !== "") {
      setId22(id2);
    }
  };

  if (view == "compare") {
    console.log(id22);
    if (!id22 == "") {
      return (
        <>
          <div className="m-10 flex flex-col items-center gap-20">
            <div className="w-full">
              <Nav name={name} />
            </div>
            <div className="rounded-xl p-8">
              <CompareStats name1={name} name2={id22} />
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="m-10 flex flex-col items-center gap-20">
        <div className="w-full">
          <Nav name={name} />
        </div>
        <div className="flex h-96 items-center justify-center">
          <div className="flex">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleId2Input();
              }}

              className="flex"
            >
              <input
                className="block h-12 w-full rounded-l-lg border border-secondary-color bg-primary-color p-4 text-sm text-secondary-color"
                type="text"
                value={id2}
                onChange={(e) => setId2(e.target.value)}
                placeholder="Compare to"
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-r-lg bg-secondary-color px-4 py-2 text-sm font-medium text-primary-color hover:bg-secondary-color-dark focus:outline-none"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
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
