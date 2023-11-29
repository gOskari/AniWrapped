"use client";
import { request, gql } from "graphql-request";

const queryAniListAndSaveDataToServer = async (name) => {
  const aniListApiEndpoint = "https://graphql.anilist.co";
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
            genres {
              genre
              count
            }
          }
        }
      }
    }
  `;

  const anilist_response = await request(aniListApiEndpoint, GET_USER, {
    name: name,
  });

  // Use an HTTP POST request to send the data to your server
  const serverEndpoint = "/api/saveUserData";
  console.log("Sending user data to server.");
  const response = await fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anilist_response.User),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Data sent");
    //console.log('PII PII', data); // This will contain the response from the server
    return data;
  } else {
    console.error("Failed to send user data to the server. Error:", response.json());
    return null;
  }
};

export { queryAniListAndSaveDataToServer };
