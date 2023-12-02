"use server";
import prisma from "@/lib/prisma";
import { request, gql } from "graphql-request";
import { cache } from "react";

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
const getUser = cache(async (name: string) => {
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
    console.log("User not found.");
    console.log("getUser error occured.");
    return null;
  }
  console.log("Found user:", user.name);
  return user;
});
// The saveUser function should match the Prisma types
const saveUser = async (User: UserType)=> {
  try {
    const user = {
      id: User.id,
      name: User.name || "fallback",
      avatar: User.avatar.large || "fallback",
      anime_count: User.statistics.anime.count || 0,
      anime_minutesWatched: User.statistics.anime.minutesWatched || 0,
      genres: User.statistics.anime.genres || [
        { count: 1, genre: "a" },
        { count: 1, genre: "b" },
        { count: 1, genre: "c" },
        { count: 1, genre: "d" },
        { count: 1, genre: "e" },
      ],
    };

    const returnUser = await prisma.pageUser.create({
      data: {
        id: user.id,
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

const deleteUser = async (name: string) => {
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

const createAniListUsers = async () => {
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

  let perPage = 50;
  let hasNextPage = true;

  for (let page = 1; hasNextPage; page++) {
    const response = await aniListQuery(page, perPage);

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
        const creatableUser = {
          name: user.name || "default",
          updatedAt: new Date(user.updatedAt * 1000) || new Date(),
          anime_minutesWatched: user.statistics.anime.minutesWatched || 0,
          standardDeviation: user.statistics.anime.standardDeviation || 0,
        };

        const createdUser = await prisma.user.create({
          data: creatableUser,
        });

        console.log("Created user: ", createdUser.name);
      } catch (e) {
        console.log("createAnilistUsers | Failed to createUser:", e);
      }
    });
  }
};

const getUsers = async () => {
  const users = await prisma.User.findMany();

  //console.log(users);
  console.log("getUsers()");
  return users;
};

export { getUser, saveUser, deleteUser, createAniListUsers, getUsers };
