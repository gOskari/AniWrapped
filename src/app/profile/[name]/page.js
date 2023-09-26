//import Data from '../../Data.js';
import PauseOnHovering from '../../Carousel.js';

export default function Page({ params }) {
  console.log(params);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PauseOnHovering name={params.name}/>
    </div>
  );
}
