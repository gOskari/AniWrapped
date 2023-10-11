"use client";
import Image from "next/image";

//import { Avatar } from 'flowbite-react';

function DataPiece({ data }) {
  try {
    data = data.data;
    return (
      <div className="w-full h-screen flex items-center justify-center p-10">
        <div className="grid grid-cols-2 grid-rows-2 gap-10 justify-center items-center w-full h-full">
          <div className="h-full flex justify-center items-center backdrop-blur-sm bg-white/10 ">
            {
              //<Avatar img={data.avatar} size=""/>
            }
            <Image
              src={data.avatar}
              alt="User Avatar"
              height="500"
              width="500"
              className="object w-full h-full"
            />
          </div>
          <div className="h-full backdrop-blur-sm bg-white/10 row-start-2 flex items-center justify-center">
            <h1>{data.name}</h1>
          </div>
          <div className="h-full backdrop-blur-sm bg-white/10 flex items-center justify-center flex-col">
            <p>Anime watched: {data.statistics.count}</p>
            <p>
              Hours watched:{" "}
              {Math.round(data.statistics.minutesWatched / 60, 2)}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Datapiece error:", error);
    return <div>ei toimi</div>;
  }
}

export default function Data({ data }) {
  return <DataPiece data={data} />;
}
