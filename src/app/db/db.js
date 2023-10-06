import { request, gql } from "graphql-request";
import prisma from "../../../lib/prisma";

const fillDb = async (page, perPage) => {
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

    for (const user in response.Page.users) {
      if (1 === 1) {
        (async () => {
          console.log(await createUser(user.id, user.name, user.updateAt));
          //console.log(await createUser(10, 'user', String(new Date()), 23498, 1.5));
        })();
      } else {
        console.log("User exists.");
      }
    }

    console.log("Query done.");
    /*
    (async () => {
        console.log(await getUsers())
      })()
      */
    return response;
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

export { fillDb, findPositionBinary, getUsers, createUser };
