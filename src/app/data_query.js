import { request, gql } from "graphql-request";
import { SaveUserData } from "../app/db/db";

let cache = {};
const cacheDuration = 24 * 60 * 60 * 1000; // 1 day

async function FetchUserData(name) {
  // Check if the data is stored in local storage
  const cachedData = localStorage.getItem("userData-" + name);
  if (cachedData) {
    console.log("Returning data from local storage.");
    return JSON.parse(cachedData);
  }

  // Data is not in local storage, fetch it from the API
  const apiEndpoint = "https://graphql.anilist.co";
  const GET_USER = gql`
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
          }
        }
      }
    }
  `;

  try {
    const response = await request(apiEndpoint, GET_USER, { name: name });

    // Send the data to the server for storage
    await sendUserDataToServer(response.User);

    // Cache the data on the client
    localStorage.setItem("userData-" + name, JSON.stringify(response.User));

    console.log("Query done.");
    return response.User;
  } catch (error) {
    console.error("GraphQL Error:", error.response.errors);
    const fallbackData = {
      name: "userData.User.name",
      avatar: "https://picsum.photos/200",
      statistics: {
        count: "100",
        minutesWatched: "100",
      },
    };
    return fallbackData;
  }
}

async function sendUserDataToServer(userData) {
  // Use an HTTP POST request to send the data to your server
  const serverEndpoint = "/api/saveUserData";
  console.log("Sending user data to server.");
  const response = await fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  /*
    if (response.ok) {
        const data = await response.json();
        console.log('Data sent')
        console.log(data); // This will contain the response from the server
    } else {
        console.error('Failed to send user data to the server');
    }
    */
}

export { FetchUserData };
