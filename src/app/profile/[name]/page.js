import BaseData from "./BaseData.js";
import { deleteUser, getUser } from "@/lib/db.ts";

const areDatetimes10MinutesApart = (datetime1, datetime2) => {
  const diffInMilliseconds = Math.abs(datetime1 - datetime2);
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  console.log('diff in mins', diffInMinutes);
  return diffInMinutes >= 10;
};

export default async function Page({ params }) {
  const name = params.name;

  const fetchData = async () => {
    try {
      const response = await getUser(name);
      const user = response;

      // CHECK IF DATA IS OLD
      if (areDatetimes10MinutesApart(new Date(user.updatedAt), new Date())) {
        console.log("The datetimes are 10 minutes apart.");

        // DELETE
        await deleteUser(name);

        return null;
      } else {
        console.log("The datetimes are NOT 10 minutes apart.");
        return user;
      }
    } catch (error) {
      return null;
    }
  };


  const pageUserData = await fetchData();

  if (pageUserData) {
    console.log('Data found on server.');
  }

  return (
    <>
      <div className="m-10 flex h-fit items-center justify-center flex-col">
        {
          <BaseData
            pageUserData={pageUserData}
            pageUserName={params.name}
          />
        }
        {/*<div className="h-96 w-4/5 p-10"><AnimeRadarChart /></div>*/}
      </div>
    </>
  );
}
