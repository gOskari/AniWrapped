import Data from '../../Data.js';
import Carousel from '../../Carousel.js';

export default function Page({ params }) {
  console.log(params);

  return (
    <div>
      <h1>Your Page Title</h1>
      <Carousel />
      <Data profile_name={params.name} />
    </div>
  );
}
