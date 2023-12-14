"use client";
import Image from "next/image";

import { FaCheck, FaPlay, FaCalendar, FaGlobe, FaStar } from "react-icons/fa"; // Import icons from a popular icon library

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import { useState } from "react";

import CommonsList from "./CommonsList";

import Tooltip from "./ToolTip";

export default function CompareStats({ name1, name2 }) {
  const { loading, setLoading } = useState(true);
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
      User(id: $id) {
        name
        avatar {
          large
        }
        statistics {
          anime {
            count
            meanScore
            minutesWatched
          }
        }
      }
    }
  `;

  const idQuery = gql`
    query ($name: String!) {
      User(name: $name) {
        id
      }
    }
  `;

  const id1 = useSuspenseQuery(idQuery, {
    variables: { name: name1 },
  });

  const id2 = useSuspenseQuery(idQuery, {
    variables: { name: name2 },
  });

  console.log("idddd", id1.data);
  console.log("idddd", id2.data);

  const data1 = useSuspenseQuery(query, {
    variables: { id: id1.data.User.id },
  });

  const data2 = useSuspenseQuery(query, {
    variables: { id: id2.data.User.id },
  });

  if (data1.loading || data2.loading) {
    return <>Loading...</>;
  }

  const dict1 = data1.data.Page.mediaList;
  const dict2 = data2.data.Page.mediaList;

  const dict1Array = Object.values(dict1);
  const dict2Array = Object.values(dict2);

  const commonValues1 = [];
  const commonValues2 = [];
  const dict1UniqueValues = [];
  const dict2UniqueValues = [];

  dict1Array.forEach((value) => {
    const matchingValue = dict2Array.find(
      (item) => item.media.id === value.media.id
    );
    if (matchingValue) {
      // Common value found
      commonValues1.push(value);
      commonValues2.push(matchingValue);
    } else {
      // Unique value in dict1
      dict1UniqueValues.push(value);
    }
  });

  dict2Array.forEach((value) => {
    let value2;
    const matchingValue = dict1Array.find(
      (item) => item.media.id === value.media.id
    );
    if (!matchingValue) {
      // Unique value in dict2
      dict2UniqueValues.push(value);
    }
  });

  const Legend = () => (
    <div className="mb-4 flex items-center justify-center space-x-4">
      <div className="flex items-center space-x-1">
        <FaCheck className="text-green-500" />
        <span>Completed</span>
      </div>
      <div className="flex items-center space-x-1">
        <FaPlay className="text-blue-500" />
        <span>Watching</span>
      </div>
      <div className="flex items-center space-x-1">
        <FaCalendar className="text-teal-500" />
        <span>Planned</span>
      </div>
      <div className="flex items-center space-x-1">
        <FaStar className="text-yellow-500" />
        <span>Your Rating /</span>
        <FaGlobe />
        <span>Global Rating</span>
      </div>
    </div>
  );

  //console.log("commonValues1", commonValues1);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const user1 = data1.data.User;
  const user2 = data2.data.User;

  return (
    <>
      <Legend />
      <div className="flex justify-center gap-2">
        <div>
          <div className="m-4 flex items-center justify-between rounded-xl bg-primary-color pb-2 pl-4 pr-4 pt-2 text-lg font-bold">
            <div className="flex items-center">
              <Image
                src={user1.avatar.large}
                alt="User Avatar"
                height="50"
                width="50"
                className="rounded-full bg-bg-color"
              />
              <div>{user1.name}</div>
            </div>
            <div className="flex min-w-fit max-w-2xl justify-between gap-2 text-sm font-normal">
              <div className="flex flex-col items-center">
                <div>Hours</div>
                <div className="text-secondary-color-dark">
                  {Math.round(user1.statistics.anime.minutesWatched / 60)}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Unique</div>
                <div className="text-secondary-color-dark">
                  {dict1UniqueValues.length}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Mean</div>
                <div className="text-secondary-color-dark">
                  {Math.round(user1.statistics.anime.meanScore)}
                </div>
              </div>
            </div>
          </div>
          <CommonsList commonValues={commonValues1} />
        </div>
        <div>
          <div className="m-4 flex items-center justify-between rounded-xl bg-primary-color pb-2 pl-4 pr-4 pt-2 text-lg font-bold">
            <div className="flex items-center">
              <Image
                src={user2.avatar.large}
                alt="User Avatar"
                height="50"
                width="50"
                className="rounded-full bg-bg-color"
              />
              <div>{user2.name}</div>
            </div>
            <div className="flex min-w-fit max-w-2xl justify-between gap-2 text-sm font-normal">
              <div className="flex flex-col items-center">
                <div>Hours</div>
                <div className="text-secondary-color-dark">
                  {Math.round(user2.statistics.anime.minutesWatched / 60)}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Unique</div>
                <div className="text-secondary-color-dark">
                  {dict2UniqueValues.length}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>Mean</div>
                <div className="text-secondary-color-dark">
                  {Math.round(user2.statistics.anime.meanScore)}
                </div>
              </div>
            </div>
          </div>
          <CommonsList commonValues={commonValues2} />
        </div>
      </div>
    </>
  );
}
