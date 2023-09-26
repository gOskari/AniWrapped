'use client';

import { Carousel } from 'flowbite-react';
//import Data from './Data.js'

export default function PauseOnHovering(name) {
  console.log('Tää on se:', name['name']);
  return (
    <Carousel pauseOnHover className="h-5/6 w-5/6">
      <img
        alt="..."
        src="https://picsum.photos/200"
      />
      <img
        alt="..."
        src="https://picsum.photos/200"
      />
      <img
        alt="..."
        src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
      />
      <img
        alt="..."
        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
      />
      {/*
      <p>
        <Data profile_name={name['name']}/>
      </p>
  */}
    </Carousel>
  )
}

