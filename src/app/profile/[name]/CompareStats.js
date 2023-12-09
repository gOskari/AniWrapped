"use client";
import Image from "next/image";

import { FaCheck, FaPlay, FaCalendar } from "react-icons/fa"; // Import icons from a popular icon library

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

import CommonsList from "./CommonsList";

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
      User(id: $id) {
        avatar {
          large
        }
      }
    }
  `;

  const data1 = useSuspenseQuery(query, {
    variables: { id: id1 },
  });

  const data2 = useSuspenseQuery(query, {
    variables: { id: id2 },
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

  /*
  console.log("Common Values:", commonValues);
  console.log("Dict1 Unique Values:", dict1UniqueValues);
  console.log("Dict2 Unique Values:", dict2UniqueValues);
  */
  //console.log(commonValues);

  console.log("commonValues1", commonValues1);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="flex justify-center gap-2">
        <div>
          <div className="flex justify-center">
            <Image
              src={data1.data.User.avatar.large}
              alt="User Avatar"
              height="50"
              width="50"
              className="rounded-full bg-bg-color"
            />
          </div>
          <CommonsList commonValues={commonValues1} />
        </div>
        <div>
          <div className="flex justify-center">
            <Image
              src={data2.data.User.avatar.large}
              alt="User Avatar"
              height="50"
              width="50"
              className="rounded-full bg-bg-color"
            />
          </div>
          <CommonsList commonValues={commonValues2} />
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <Image
            src={data1.data.User.avatar.large}
            alt="User Avatar"
            height="50"
            width="50"
            className="rounded-full bg-bg-color"
          />
        </div>
        <CommonsList commonValues={dict1UniqueValues} />
      </div>
      <div>
        <div className="flex justify-center">
          <Image
            src={data2.data.User.avatar.large}
            alt="User Avatar"
            height="50"
            width="50"
            className="rounded-full bg-bg-color"
          />
        </div>
        <CommonsList commonValues={dict2UniqueValues} />
      </div>
    </>
  );
}
