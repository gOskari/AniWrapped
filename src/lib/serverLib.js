"use server";
import prisma from "@/lib/prisma";
import { request, gql } from "graphql-request";

const createAniListUsers = async () => {
  console.log("createAniListUsers");

  const aniListQuery = async (page, perPage) => {
    const endpoint = "https://graphql.anilist.co";
    const query = gql`
      query ($page: Int, $perPage: Int) {
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
            avatar {
              medium
            }
            statistics {
              anime {
                count
                minutesWatched
                standardDeviation
              }
              manga {
                count
              }
            }
          }
        }
      }
    `;

    // Introduce a delay between API requests to handle rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Adjust the delay as needed

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
      console.log("No response");
    }

    if (
      !response.Page.pageInfo.hasNextPage ||
      response.Page.pageInfo.currentPage == 300
    ) {
      console.log(
        "End of pages:",
        response.Page.pageInfo.currentPage,
        response.Page.pageInfo.hasNextPage
      );
      hasNextPage = false;
    }

    response.Page.users.forEach(async (user) => {
      console.log("Processing user:", user.name);
      try {
        const createdUser = await prisma.user.create({
          data: {
            name: user.name,
            updatedAt: new Date(user.updatedAt * 1000) || new Date(),
            avatar: {
              create: {
                medium: user.avatar.medium,
              },
            },
            statistics: {
              create: {
                anime: {
                  create: {
                    count: user.statistics.anime.count || 0,
                    minutesWatched: user.statistics.anime.minutesWatched || 0,
                    standardDeviation:
                      user.statistics.anime.standardDeviation || 0,
                  },
                },
                manga: {
                  create: {
                    count: user.statistics.manga.count || 0,
                  },
                },
              },
            },
          },
        });

        console.log("Created user:", createdUser);
      } catch (e) {
        console.log("Failed to createUser:", e);
      }
    });
  }

  // Disconnect from the database after processing
  await prisma.$disconnect();
};

// Invoke the function
createAniListUsers();


const getUsers = async ({ page = 1, pageSize = 50 }) => {
  const offset = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    take: pageSize,
    skip: offset,
    orderBy: {
      statistics: {
        anime: {
          minutesWatched: "desc",
        }
      }
    },
    include: {
      avatar: { select: { medium: true } },
      statistics: {
        include: {
          anime: {
            select: {
              count: true,
              minutesWatched: true,
              standardDeviation: true,
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  return users;
};

export { createAniListUsers, getUsers };
