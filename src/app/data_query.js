import { request, gql } from 'graphql-request';


async function FetchUserData(name) {
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


    try {
        const response = await request(endpoint, GET_USER, {
        name: name, // Pass any required variables
        });
        const userData = response;

        const userData2 = {
            name: userData.User.name,
            avatar: userData.User.avatar.large,
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

export {FetchUserData};