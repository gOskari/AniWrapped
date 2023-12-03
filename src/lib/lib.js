import { request, gql } from "graphql-request";

const getAniList = async (name) => {
  const query = gql`
    query ($id: Int, $name: String) {
      User(id: $id, name: $name) {
        id
        name
        avatar {
          large
          medium
        }
        statistics {
          anime {
            count
            minutesWatched
            genres {
              genre
              count
            }
          }
        }
      }
    }
  `;
  console.log("Queried AniList.");
  try {
    const res = await request("https://graphql.anilist.co", query, {
      name: name,
    });
    console.log("Anilist query succesful");
    return res;
  } catch {
    console.log("Failed Anilist query; returned null.");
    return null;
  }
};

const findPositionBinary = (data, num) => {
  let arr = data.map((item) => item.anime_minutesWatched).sort((a, b) => b - a);

  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] <= num) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return `${low + 1}/${data.length}`;
};

export { getAniList, findPositionBinary };
