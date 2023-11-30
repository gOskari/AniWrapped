import BaseData from "./BaseData.js";
import { deleteUser, getUser } from "@/lib/db.ts";

export default async function Page({ params }) {
  const name = params.name;
  const user = await getUser(name);
  

  if (user) {
    console.log("User found from server.");

    // CHECK IF DATA IS 10 MINUTES OLD
    if (Math.abs(new Date(user.updatedAt) - new Date()) / (1000 * 60) >= 10) {
      console.log("The datetimes are 10 minutes apart.");

      // DELETE OLD DATA
      await deleteUser(name);
    } else {
      console.log("The datetimes are NOT 10 minutes apart.");
    }
  }

  return (
    <>
      <div className="m-10 flex h-fit items-center justify-center flex-col">
        {<BaseData pageUserData={user} pageUserName={params.name} />}
      </div>
    </>
  );
}
