import BaseData from "./BaseData.js";
import prisma from "../../../../lib/prisma";
import { queryAniListAndSaveDataToServer } from "./clientComponent.js";
import AnimeRadarChart from '../../Chart.js'
import { fillDb } from "../../db/db.js"

const areDatetimes10MinutesApart = (datetime1, datetime2) => {
  const diffInMilliseconds = Math.abs(datetime1 - datetime2);
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  return diffInMinutes >= 10;
}

const getPageUserData = async (name) => {
  const data = await prisma.PageUser.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
  return data;
}

async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

const createUser = async (
  id,
  name,
  updatedAt,
  anime_minutesWatched,
  standardDeviation
) => {
  console.log(new Date());
  const user = await prisma.user.create({
    data: {
      name: name || "user",
      updatedAt: updatedAt || new Date(),
      anime_minutesWatched: anime_minutesWatched || 123,
      standardDeviation: standardDeviation || 1.0,
    },
  });
  return user;
};


export default async function Page({ params }) {
  //let data = getPageUserData(params.name)

  console.log('params:', params.name);

  let data;
  getPageUserData(params.name)
  .then(user => {
    data = user;
  })
  .catch(error => {
    console.error('Error fetching pageUser:', error);
  });

  //console.log(await createUser(10, 'moi', '2334', 100, 10));

  if (data) {
    if (areDatetimes10MinutesApart(data.updatedAt, new Date())) {
      console.log("The datetimes are 10 minutes apart.");
      await prisma.genre.deleteMany({
        where: {
          userId: data.id,
        },
      });
      await prisma.PageUser.delete({
        where: {
          id: data.id,
        },
      })
      data = null;    
    } else {
      console.log("The datetimes are NOT 10 minutes apart.");
    }
  } else {
    console.log("Invalid updatedAt value. Unable to compare datetimes.");
  }

  //await fillDb(1, 30);

  const allUsers = getAllUsers()
  .then(users => {
    return users;
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });

  //console.log('page.js getAllUsers() | ', await allUsers);

  return (
    <>
      <div className="m-10 flex h-fit items-center justify-center flex-col">
        {
          <BaseData
            dator={data}
            name={params.name}
            queryAniListAndSaveDataToServer={queryAniListAndSaveDataToServer}
            users={await allUsers}
          />
        }
        {/*<div className="h-96 w-4/5 p-10"><AnimeRadarChart /></div>*/}
      </div>
    </>
  );
}
