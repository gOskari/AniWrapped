'use server'
import { getComparisonData, findPositionBinary } from './db.js';

export default async function Db() {

  const data = await getComparisonData(1, 5);

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <code>
            {JSON.stringify(data)}
            {findPositionBinary(data, 93824)}
        </code>
    </div>
  );
}
