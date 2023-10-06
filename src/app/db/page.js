'use server'
import { fillDb, findPositionBinary, getUsers } from './db.js';
import prisma from '../../../lib/prisma';

export default async function Db() {
  const data = await getUsers();

  const users = await prisma.user.findMany({
    select: {
      anime_minutesWatched: true,
    },
  })

  console.log(users[1]);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <section>
        {users.map((user) => (
          console.log(user.anime_minutesWatched),
          <div key={Math.random() * 1000000}>
            {user.anime_minutesWatched}
          </div>
        ))}
        wau
      </section>
    </div>
  );
}
