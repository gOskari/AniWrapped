import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
  const body = req.body;

  const userData = {
    name: body.name,
    avatar: body.avatar.large,
    anime_count: body.statistics.anime.count,
    anime_minutesWatched: body.statistics.anime.minutesWatched,
    genres: body.statistics.anime.genres,
  };

  const { genres, ...userDataWithoutGenres } = userData;

  try {
    const user = await prisma.pageUser.create({
      data: {
        ...userDataWithoutGenres,
        genres: {
          create: genres.map((genre) => ({
            genre: genre.genre,
            count: genre.count,
          })),
        },
      },
      include: {
        genres: true,
      },
    });

    console.log("Created user:", user);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e});
  }
};

export default handler;
