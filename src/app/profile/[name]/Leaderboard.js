import Link from "next/link";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";

const Leaderboard = ({ id }) => {
  const [users, setUsers] = useState();
  const router = useRouter();

  useEffect(() => {
    const gettaa = async (id) => {
      console.log(getFollowing(id));

      /*
      const getCachedUser = unstable_cache(
        async (id) => getFollowing(id),
        ['my-app-user']
      );
    
      const users = getCachedUser(id);
      */

      const users = await getFollowing(id);
      setUsers(await users);
    };
    gettaa(id);
  }, []);

  if (!users) {
    return <>No users...</>;
  }

  console.log(users);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex gap-20">
            <Image
              src={user.avatar.medium}
              alt="User Avatar"
              height="100"
              width="100"
              className="rounded-full"
            />
            <div>{user.name}</div>
            <div>
              {Math.round(user.statistics.anime.minutesWatched / 60)} Hours
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const getFollowing = async (param) => {
  console.log(param);
  const query = gql`
    query ($param: Int!) {
      Page(page: 1, perPage: 20) {
        following(userId: $param, sort: WATCHED_TIME_DESC) {
          id
          name
          avatar {
            medium
          }
          statistics {
            anime {
              minutesWatched
            }
          }
        }
      }
    }
  `;

  const res = await request("https://graphql.anilist.co", query, {
    param: param,
  });

  if (!res) {
    return null;
  }

  console.log(res);

  return res.Page.following;
};

export default Leaderboard;
