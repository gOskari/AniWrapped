'use client';

import { Carousel } from 'flowbite-react';
import Data from './Data.js'

export default function DataCarousel(data) {
  return (
    <Carousel slide={false} className="p-20">
      <Data data={data} />
      <Data data={data} />
      <Data data={data} />
      <Data data={data} />
      <Data data={data} />
    </Carousel>
  )
}

