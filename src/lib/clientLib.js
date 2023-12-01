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

export { getAniList };
