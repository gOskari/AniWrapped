import BaseData from "./BaseData.js";
import prisma from "../../../../lib/prisma";
//import { fillDb } from "../../db/db.js"

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

  //console.log(await createUser(10, 'moi', '2334', 100, 10));
  //await fillDb(1, 30);

  /*
  const allUsers = getAllUsers()
  .then(users => {
    return users;
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });
  */

  return (
    <>
      <div className="m-10 flex h-fit items-center justify-center flex-col">
        {
          <BaseData
            name={params.name}
         //   users={await allUsers}
          />
        }
        {/*<div className="h-96 w-4/5 p-10"><AnimeRadarChart /></div>*/}
      </div>
    </>
  );
}
