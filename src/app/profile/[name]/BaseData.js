"use client";
import Image from "next/image";
import { changeTheme } from "@/utils/helper";

export default function BaseData(props) {
  try {
    console.log(props);
    let data = props.data;
    return (
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
              <span>{data.statistics.count}</span>
            </div>
            <div className="flex gap-10 justify-between">
              <span>Hours</span>
              <span>{Math.round(data.statistics.minutesWatched / 60, 2)}</span>
            </div>
          </div>
        </div>
        <div className="grid place-items-center">
          <div>
            <button
              className="py-2 px-8 bg-buttons text-typography m-2"
              onClick={() => changeTheme("dark")}
            >
              Dark
            </button>
            <button
              className="py-2 px-8 bg-buttons text-typography m-2"
              onClick={() => changeTheme("light")}
            >
              Bright
            </button>
          </div>
        </div>
      </>
    );
  } catch (e) {
    console.log("BaseData error:", e);
    return <p>ei toimi</p>;
  }
}
