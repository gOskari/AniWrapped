'use client';
import Image from "next/image";

//import { Avatar } from 'flowbite-react';

function DataPiece({data}) {
  try {
    data = data.data;
    return (
      <div className="w-full h-screen flex items-center justify-center p-10">
        <div className="grid grid-cols-2 grid-rows-2 gap-10 justify-center items-center w-3/4 h-3/4">
          <div className="h-full flex justify-center items-center flex-col backdrop-blur-sm bg-white/10">
          <h1 className="text-3xl">Anilist User:</h1>
          <h1 className="text-6xl">{data.name}</h1>
          </div>
          <div className="h-full backdrop-blur-sm bg-white/10 row-start-2 flex items-center justify-center flex-col col-span-2">
          <p className="p-10 text-2xl">Total Anime Watched: {data.statistics.count}</p>
          <p className="p-10 text-2xl">Total Hours Watched: {Math.round((data).statistics.minutesWatched/60, 2)}</p>
          </div>
          <div className="h-full backdrop-blur-sm flex items-center justify-center flex-col">
          <Image src={data.avatar} alt="User Avatar" height="500" width="500" className="object-none w-full h-full"/>
          </div>
        </div>
      </div>            
    );

  } catch (error) {
    console.error('Datapiece error:', error);
    return <div>ei toimi</div>
  }
}

export default function Data({data}) {
    return (
      <DataPiece data={data} />
    );
}