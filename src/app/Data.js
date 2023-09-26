import { request, gql } from 'graphql-request';

async function DataPiece({profile_name}) {
  try {
  console.log(profile_name);
    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible


    const endpoint = 'https://graphql.anilist.co';

    const GET_USER = gql`
    query ($id: Int, $name: String) { # Define which variables will be used in the query (id)
        User (id: $id, name: $name) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
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
            }
          }
        }
      }
    `;

    

    async function fetchUserData(name) {
      try {
          const response = await request(endpoint, GET_USER, {
          name: name, // Pass any required variables
          });
          const userData = response;

          const userData2 = {
              name: userData.User.name,
              avatar: userData.User.avatar.medium,
              statistics: {
                  count: userData.User.statistics.anime.count,
                  minutesWatched: userData.User.statistics.anime.minutesWatched
              }
          }
          console.log('Query done.')
          return userData2;
      } catch (error) {
          console.error('GraphQL Error:', error.response.errors);
          const userData2 = {
            name: 'userData.User.name',
            avatar: 'https://picsum.photos/200',
            statistics: {
                count: '100',
                minutesWatched: '100'
            }
          }
          return userData2;
      }
    }


    const data = fetchUserData(profile_name); // Call the function with the desired user ID
    return (
        <div>
            <h1>{(await data).name}</h1>
            <img src={(await data).avatar}></img>
            <p>Anime watched: {(await data).statistics.count}</p>
            <p>Hours watched: {Math.round((await data).statistics.minutesWatched/60, 2)}</p>
        </div>
    );

  } catch (error) {
    console.error('Datapiece error:', error);
    return <div>ei toimi</div>
  }
}

export default async function Data({profile_name}) {
    return (
        <section>
        <DataPiece profile_name={profile_name} />
        </section>
    );
}