"use client";
import { FaCheck, FaPlay, FaCalendar } from "react-icons/fa"; // Import icons from a popular icon library

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

export default function CompareStats({ id1, id2 }) {
  const query = gql`
    query ($id: Int!) {
      Page(page: 1, perPage: 50) {
        mediaList(userId: $id) {
          score
          progress
          status
          media {
            id
            title {
              english
            }
            format
            averageScore
          }
        }
      }
    }
  `;

  const data1 = useQuery(query, {
    client,
    variables: { id: id1 },
  });

  const data2 = useQuery(query, {
    client,
    variables: { id: id2 },
  });

  if (data1.loading || data2.loading) {
    return <>Loading...</>;
  }

  const dict1 = data1.data.Page.mediaList;
  const dict2 = data2.data.Page.mediaList;

  const dict1Array = Object.values(dict1);
  const dict2Array = Object.values(dict2);

  const commonValues = [];
  const dict1UniqueValues = [];
  const dict2UniqueValues = [];

  dict1Array.forEach((value) => {
    const matchingValue = dict2Array.find(
      (item) => item.media.id === value.media.id
    );
    if (matchingValue) {
      // Common value found
      commonValues.push(value);
    } else {
      // Unique value in dict1
      dict1UniqueValues.push(value);
    }
  });

  dict2Array.forEach((value) => {
    const matchingValue = dict1Array.find(
      (item) => item.media.id === value.media.id
    );
    if (!matchingValue) {
      // Unique value in dict2
      dict2UniqueValues.push(value);
    }
  });

  /*
  console.log("Common Values:", commonValues);
  console.log("Dict1 Unique Values:", dict1UniqueValues);
  console.log("Dict2 Unique Values:", dict2UniqueValues);
  */

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <br></br>
      COMMON
      <br></br>
      <ol className="space-y-1">
        {commonValues.map((item, index) => (
          <li
            key={index}
            className="flex w-2/4 flex-col items-center justify-start rounded-xl bg-bg-color px-2 py-1"
          >
            <div>
              {/* Fixed width for the title and truncate to handle overflow */}
              <div className="w-full">{item.media.title.english}</div>
            </div>

            {/* Fixed width for the checkmarks to align them */}
            <div className="flex gap-10">
              <div className="flex flex-start w-8 justify-center rounded-xl bg-primary-color">
                {item.status === "COMPLETED" && (
                  <FaCheck className="text-green-500" />
                )}
                {item.status === "CURRENT" && (
                  <FaPlay className="text-blue-500" />
                )}
                {item.status === "PLANNING" && (
                  <FaCalendar className="text-yellow-500" />
                )}
              </div>

              {/* Flexible space for scores but with some margin */}
              <div className="mx-2 flex-1 rounded-xl bg-primary-color text-center">
                {item.score}
              </div>
              <div className="mx-2 flex-1 rounded-xl bg-primary-color text-center">
                {item.media.averageScore}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <br></br>
      UNIQUE 1<br></br>
      <ol>
        {dict1UniqueValues.map((item) => (
          <li
            key={getRandomInt(1000000)}
            className="flex justify-between gap-5"
          >
            <div>{item.media.title.english}</div>
            <div>
              {item.status === "COMPLETED" && <FaCheck />}
              {item.status === "CURRENT" && <FaPlay />}
              {item.status === "PLANNING" && <FaCalendar />}
            </div>
            <div>{item.score}</div>
            <div>{item.media.averageScore}</div>
          </li>
        ))}
      </ol>
      <br></br>
      UNIQUE 2<br></br>
      <ol>
        {dict2UniqueValues.map((item) => (
          <li
            key={getRandomInt(1000000)}
            className="flex justify-between gap-5"
          >
            <div>{item.media.title.english}</div>
            <div>
              {item.status === "COMPLETED" && <FaCheck />}
              {item.status === "CURRENT" && <FaPlay />}
              {item.status === "PLANNING" && <FaCalendar />}
            </div>
            <div>{item.score}</div>
            <div>{item.media.averageScore}</div>
          </li>
        ))}
      </ol>
    </>
  );
}
