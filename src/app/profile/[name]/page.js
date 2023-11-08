import BaseData from "./BaseData.js";
import prisma from "../../../../lib/prisma";
import { queryAniListAndSaveDataToServer } from "./clientComponent.js";

export default async function Page({ params }) {
  let data = await prisma.PageUser.findFirst({
    where: {
      name: {
        equals: params.name,
        mode: "insensitive",
      },
    },
  });

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
      </div>
    </>
  );
}
