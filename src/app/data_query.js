import { request, gql } from 'graphql-request';
import { SaveUserData } from '../app/db/db';

let cache = {};
const cacheDuration = 24 * 60 * 60 * 1000;  // 1 day

async function FetchUserData(name) {
    const cachedData = localStorage.getItem('userData-' + name);
    if (cachedData) {
        console.log('Returning data from local storage.');
        return JSON.parse(cachedData);
    }

    const cacheKey = name;
    const currentTime = Date.now();

    // Clear expired cache entries
    Object.keys(cache).forEach(key => {
        if (currentTime - cache[key].timestamp > cacheDuration) {
            delete cache[key];
        }
    });

    // If data is in cache, return it
    if (cache[cacheKey]) {
        console.log('Returning data from cache.');
        return cache[cacheKey].data;
    }

    const endpoint = 'https://graphql.anilist.co';

    const GET_USER = gql`
    query ($id: Int, $name: String) {
        User (id: $id, name: $name) {
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
        const response = await request(endpoint, GET_USER, { name: name });
        const userData = {
            id: response.User.id,
            name: response.User.name,
            avatar: response.User.avatar.large,
            statistics: {
                count: response.User.statistics.anime.count,
                minutesWatched: response.User.statistics.anime.minutesWatched
            }
        };

        // Save the fetched data to the database
        await SaveUserData(userData);

        // Cache data before returning
        cache[cacheKey] = { data: userData, timestamp: currentTime };

        localStorage.setItem('userData-' + name, JSON.stringify(userData));

        console.log('Query done.');
        return userData;
    } catch (error) {
        console.error('GraphQL Error:', error.response.errors);
        const fallbackData = {
            name: 'userData.User.name',
            avatar: 'https://picsum.photos/200',
            statistics: {
                count: '100',
                minutesWatched: '100'
            }
        };
        return fallbackData;
    }
}

async function sendUserDataToServer(userData) {
    // Use an HTTP POST request to send the data to your server
    const serverEndpoint = '/api/saveUserData';
    const response = await fetch(serverEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
}


export { FetchUserData };