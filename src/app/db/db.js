import { request, gql } from "graphql-request";

const getComparisonData = async (page, perPage) => {
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
    const userData = response;

    /*
        const userData2 = {
            name: userData.User.name,
            avatar: userData.User.avatar.large,
            statistics: {
                count: userData.User.statistics.anime.count,
                minutesWatched: userData.User.statistics.anime.minutesWatched
            }
        }
        */
    console.log("Query done.");
    return response;
  } catch (error) {
    console.error("GraphQL Error:", error);
    return "Error", error;
  }
}

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
}

export { getComparisonData, findPositionBinary };
