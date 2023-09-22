import Data from '../../Data.js';
import SlickCarousel from '../../Carousel.js';

export default function Page({ params }) {
  console.log(params);

  return (
    <div>
      <h1>Your Page Title</h1>
      
      {/* Include Slick Carousel */}
      <SlickCarousel />

      {/* Your existing Data component */}
      <Data profile_name={params.name} />
    </div>
  );
}
