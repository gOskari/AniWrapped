import { request, gql } from "graphql-request";
import prisma from "../../../lib/prisma";

const getAnilistData = async (page, perPage) => {
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
          id
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

    console.log("response: ", response.Page.users);
    return response;
  } catch (error) {
    console.log("Anilist query error:", error);
    return error;
  }
};

const fillDb = async (page, perPage) => {
  try {
    const response = await getAnilistData(page, perPage);

    for (const user in response.Page.users) {
      try {
        (async () => {
          console.log(await createUser(user.id, user.name, user.updateAt));
        });
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
  console.log(data.Page.users);

  let arr = [];
  for (const item of data.Page.users) {
    console.log("item:", item.statistics.anime.minutesWatched);
    arr.push(item.statistics.anime.minutesWatched);
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

  return low;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const createUser = async (
  id,
  name,
  updatedAt,
  anime_minutesWatched,
  standardDeviation
) => {
  console.log(new Date());
  const user = await prisma.user.create({
    data: {
      name: name || "user",
      updatedAt: updatedAt || new Date(),
      anime_minutesWatched: anime_minutesWatched || 123,
      standardDeviation: standardDeviation || 1.0,
    },
  });
  return user;
};

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

async function SaveUserData(userData) {
  try {
      const user = await createUser(
          userData.id,
          userData.name,
          new Date(),
          userData.statistics.minutesWatched
      );
      console.log('User saved to database:', user);
  } catch (error) {
      console.error('Database Error:', error);
  }
}

export { fillDb, findPositionBinary, getUsers, createUser, SaveUserData };
