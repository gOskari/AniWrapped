import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <Slider {...settings}>
          <div>
            <h3>Item 1</h3>
          </div>
          <div>
            <h3>Item 2</h3>
          </div>
          <div>
            <h3>Item 3</h3>
          </div>
        </Slider>
    );
}