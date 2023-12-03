import Image from "next/image";

export default function BaseData({ userData }) {
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
          <h1 className="text-2xl">{userData.name}</h1>
        </div>
        <div className="">
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
      </div>
    </>
  );
}
