'use server'
import DataCarousel from '../../Carousel.js';
import { FetchUserData } from '../../data_query.js';

export default async function Page({ params }) {
  console.log(params.name);

  const data = await FetchUserData(params.name);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <DataCarousel data={data}/>
    </div>
  );
}
