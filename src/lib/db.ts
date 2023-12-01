"use server";
import prisma from "@/lib/prisma";
import { request, gql } from "graphql-request";

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
    console.log("getUser error occured.");
    return null;
  }

  return user;
};

// The saveUser function should match the Prisma types
const saveUser = async (user: UserType): Promise<prisma.PageUser | null> => {
  try {
    const returnUser = await prisma.pageUser.create({
      data: {
        name: user.name,
        avatar: user.avatar,
        anime_count: user.anime_count,
        anime_minutesWatched: user.anime_minutesWatched,
        genres: {
          create: user.genres.map((genre) => ({
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
    console.error("saveUser error occurred:");
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
      console.log("User not found or already deleted.");
    }
  } catch (e) {
    console.error("Deleting error occurred");
  }
};

const findPositionBinary = (data: prisma.PageUser[], num: number): string => {
  let arr = data.map((item) => item.anime_minutesWatched);

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

const createAniListUsers = async () => {
  console.log("ok");
  const aniListQuery = async (page, perPage) => {
    const endpoint = "https://graphql.anilist.co";
    const query = gql`
      query ($page: Int, $perPage: Int) {
        # Define which variables will be used in the query (id)
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          users {
            name
            updatedAt
            statistics {
              anime {
                count
                minutesWatched
                standardDeviation
              }
            }
          }
        }
      }
    `;
    try {
      const response = await request(endpoint, query, {
        page: page,
        perPage: perPage,
      });
      return response;
    } catch (error) {
      console.log("Anilist query error:", error);
      return error;
    }
  };

  const createUser = async (
    name,
    updatedAt,
    anime_minutesWatched,
    standardDeviation
  ) => {
    const user = await prisma.user.create({
      data: {
        name: name,
        updatedAt: updatedAt,
        anime_minutesWatched: anime_minutesWatched,
        standardDeviation: standardDeviation,
      },
    });
    return user;
  };

  let perPage = 50;
  let hasNextPage = true;

  for (let page = 1; hasNextPage; page++) {
    const response = await aniListQuery(page, perPage);
    console.log("response tuli", response);

    if (!response) {
      console.log("Ei responsee");
    }

    if (
      !response.Page.pageInfo.hasNextPage ||
      response.Page.pageInfo.currentPage == 2
    ) {
      console.log(
        "vika:",
        response.Page.pageInfo.currentPage,
        response.Page.pageInfo.hasNextPage
      );
      hasNextPage = false;
    }

    response.Page.users.forEach(async (user) => {
      console.log("for lööp");
      try {
        console.log('user:', user);
        const createdUser = await createUser(
          user.name || "default",
          user.updatedAt || new Date(),
          user.statistics.anime.minutesWatched || 0,
          user.statistics.anime.standardDeviation || 0
        );

        console.log("Created user: ", createdUser.name);
      } catch (e) {
        console.log("createAnilistUsers | Failed to createUser:", e);
      }
    })
  }
};

export {
  findPositionBinary,
  getUser,
  saveUser,
  deleteUser,
  createAniListUsers,
};
