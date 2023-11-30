"use server";

import prisma from "@/lib/prisma";

// TypeScript types should match your Prisma model, including nested structures
type GenreType = {
  genre: string;
  count: number;
};

type UserType = {
  name: string;
  avatar: string;
  anime_count: number;
  anime_minutesWatched: number;
  genres: GenreType[];
};

// Since Prisma's findFirst method returns the PageUser type, we should match that
const getUser = async (name: string): Promise<prisma.PageUser | null> => {
  const user = await prisma.pageUser.findFirst({
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

// The saveUser function should match the Prisma types
const saveUser = async (User: { User: UserType }): Promise<prisma.PageUser | null> => {

  try {
    const returnUser = await prisma.pageUser.create({
      data: {
        name: User.name,
        avatar: User.avatar,
        anime_count: User.anime_count,
        anime_minutesWatched: User.anime_minutesWatched,
        genres: {
          create: User.genres.map((genre) => ({
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
    return returnUser;
  } catch (e) {
    console.error("saveUser error occurred:", e);
    return null;
  }
};

const deleteUser = async (name: string): Promise<void> => {
  try {
    const deletedCount = await prisma.pageUser.deleteMany({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (deletedCount.count > 0) {
      console.log(`Deleted user: ${name}`);
    } else {
      console.log('User not found or already deleted.');
    }
  } catch(e) {
    console.error('Deleting error occurred', e);
  }
};

// Assuming getAnilistData and createUser are defined elsewhere
// If not, you need to define these functions or remove the call if not in use

const fillDb = async (page: number, perPage: number): Promise<void> => {
  // Your fillDb implementation here
  // ...
};

const findPositionBinary = (data: prisma.PageUser[], num: number): string => {
  let arr = data.map(item => item.anime_minutesWatched);

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

  return `${low + 1}/${data.length}`;
};

export {
  fillDb,
  findPositionBinary,
  getUser,
  saveUser,
  deleteUser
};