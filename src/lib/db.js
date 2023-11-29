"use server";
import prisma from "@/lib/prisma";

const getUser = async (name) => {
  const user = await prisma.PageUser.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
    include: { genres: true },
  });

  if (!user) {
    console.log('User not found.');
    return null;
  }

  return user;
};

const saveUser = async (body) => {

  for (let item in body.User) {
    console.log(item);
  }
  body = body.User;
  const userData = {
    name: body.name || "fallback",
    avatar: body.avatar.large || "fallback",
    anime_count: body.statistics.anime.count || 0,
    anime_minutesWatched: body.statistics.anime.minutesWatched || 0,
    genres: body.statistics.anime.genres || [
      { count: 0, genre: "a" },
      { count: 0, genre: "b" },
      { count: 0, genre: "c" },
      { count: 0, genre: "d" },
      { count: 0, genre: "e" },
    ],
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

    console.log("Saved user.");
    return user;
  } catch (e) {
    console.log("saveuser error occured:", e);
    return null;
  }
};

const deleteUser = async (name) => {

  try {
    const deletedItem = await prisma.PageUser.deleteMany({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (deletedItem) {
      console.log("deleted item:", deletedItem);
    }
  } catch(e) {
    console.log('deleting error occured', e);
  }
}

const fillDb = async (page, perPage) => {
  try {
    const response = await getAnilistData(page, perPage);

    for (const user in response.Page.users) {
      try {
        async () => {
          console.log(await createUser(user.id, user.name, user.updateAt));
        };
      } catch (e) {
        console.log("filldb error:", e);
      }
    }
  } catch (error) {
    console.error("GraphQL Error:", error);
    return "Error", error;
  }
};

const findPositionBinary = (data, num) => {
  console.log("findPositionBinary | ", data);

  let arr = [];
  for (const item of data) {
    console.log("item:", item.minutesWatched);
    arr.push(item.minutesWatched);
  }

  console.log(arr); // [1, 2, 3, 4]

  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] < num) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low + 1 + "/" + data.length;
};

export {
  fillDb,
  findPositionBinary,
  getUser,
  saveUser,
  deleteUser
};
