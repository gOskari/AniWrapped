import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const body = req.body;
  console.log('generet: ', body.genres);
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
    const userData = {
      name: body.name,
      avatar: body.avatar.large,
      anime_count: body.statistics.anime.count,
      anime_minutesWatched: body.statistics.anime.minutesWatched,
      genres: body.statistics.anime.genres,
    };
    

    await createPageUser(userData)
    .then(user => {
      console.log('Created user:', user);
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  }
  res.status(200).json(pageUser);
};

async function createPageUser(userData) {
  const { genres, ...userDataWithoutGenres } = userData;

  const user = await prisma.pageUser.create({
    data: {
      ...userDataWithoutGenres,
      genres: {
        create: genres.map(genre => ({ genre: genre.genre, count: genre.count })),
      },
    },
    include: {
      genres: true,
    },
  });

  return user;
}

export default handler;
