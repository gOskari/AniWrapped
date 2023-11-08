'use server'
import { fillDb, findPositionBinary, getUsers } from './db.js';
import prisma from '../../../lib/prisma';

export default async function Db() {
  //const data = await prisma.PageUser.findMany();


  
  const data = await prisma.PageUser.findFirst({
    where: {
      name: 'Ok'
    }
  })
  
  console.log(data);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <code>
        {JSON.stringify(data)}
        wau
      </code>
    </div>
  );
}
