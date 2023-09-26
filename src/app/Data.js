'use client';

//import { Avatar } from 'flowbite-react';

function DataPiece({data}) {
  try {
    data = data.data;
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-950 p-10">
        <div className="grid grid-cols-2 grid-rows-2 gap-10 justify-center items-center w-full h-full rounded-xl">
          <div className="h-full flex justify-center items-center bg-gray-900 rounded-xl">
            {//<Avatar img={data.avatar} size=""/>
            }
            <img src={data.avatar} className="object-cover w-full h-full rounded-xl"></img>
          </div>
          <div className="h-full bg-gray-900 row-start-2 flex items-center justify-center rounded-xl">
            <h1>{data.name}</h1>
          </div>
          <div className="h-full bg-gray-900 flex items-center justify-center flex-col row-span-2 rounded-xl">
            <p>Anime watched: {data.statistics.count}</p>
            <p>Hours watched: {Math.round((data).statistics.minutesWatched/60, 2)}</p>
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