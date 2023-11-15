import BaseData from "./BaseData.js";
import prisma from "../../../../lib/prisma";
import { queryAniListAndSaveDataToServer } from "./clientComponent.js";
import AnimeRadarChart from '../../Chart.js'

function areDatetimes10MinutesApart(datetime1, datetime2) {
  const diffInMilliseconds = Math.abs(datetime1 - datetime2);
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  return diffInMinutes >= 10;
}

export default async function Page({ params }) {
  let data = await prisma.PageUser.findFirst({
    where: {
      name: {
        equals: params.name,
        mode: "insensitive",
      },
    },
  });

  if (data) {
    if (areDatetimes10MinutesApart(data.updatedAt, new Date())) {
      console.log("The datetimes are 10 minutes apart.");
      const deleteUser = await prisma.PageUser.delete({
        where: {
          id: data.id,
        },
      })
      data = null;
      console.log('DELETED: ', deleteUser);      
    } else {
      console.log("The datetimes are NOT 10 minutes apart.");
    }
  } else {
    console.log("Invalid updatedAt value. Unable to compare datetimes.");
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center flex-col">
        {
          <BaseData
            dator={data}
            name={params.name}
            queryAniListAndSaveDataToServer={queryAniListAndSaveDataToServer}
          />
        }
        <div className="h-96 w-4/5"><AnimeRadarChart /></div>
      </div>
    </>
  );
}
