import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const body = req.body;
  console.log("Data serverillä");

  let pageUser = await prisma.PageUser.findFirst({
    where: {
      name: {
        equals: body.name,
        mode: "insensitive",
      },
    },
  });

  if (!pageUser) {
    pageUser = await createPageUser(
      body.name,
      body.avatar.large,
      body.statistics.anime.count,
      body.statistics.anime.minutesWatched
    );
  }
  res.status(200).json(pageUser);
};

const createPageUser = async (
  name,
  avatar,
  anime_count,
  anime_minutesWatched
) => {
  const pageUser = await prisma.PageUser.create({
    data: {
      name: name || "user",
      avatar: avatar || new Date(),
      anime_count: anime_count || 100,
      anime_minutesWatched: anime_minutesWatched || 100,
    },
  });
  return pageUser;
};

export default handler;
