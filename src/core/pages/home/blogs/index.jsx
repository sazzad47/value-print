import React from "react";
import Carousel from "better-react-carousel";
import { sliderImage } from "./sliderImage";

const breakpoints = [
  {
    breakpoint: 400,
    cols: 1,
    rows: 1,
    gap: 2,
    loop: true,
    autoplay: 3000,
  },
  {
    breakpoint: 1024,
    cols: 3,
    rows: 1,
    gap: 10,
    loop: true,
    autoplay: 3000,
  },
  {
    breakpoint: 1280,
    cols: 4,
    rows: 1,
    gap: 10,
    loop: true,
    autoplay: 3000,
  },
];

const Gallery = () => {
  return (
    <div className="w-full mt-[3rem] h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] bg-white">
      <div className="w-full flex flex-col gap-[3rem]">
        <div>
          <h3 className="text-3xl font-bold text-center text-fuchsia-900">
            Blogs
          </h3>
          <h3 className="text-2xl font-medium text-center text-pink-600 mt-2">
            Dive into the Artistry of Printing Services
          </h3>
        </div>
        <Carousel
          hideArrow={true}
          showDots={true}
          responsiveLayout={breakpoints}
        >
          {sliderImage.map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="flex flex-col items-center gap-5">
                <img className="w-full h-[200px]" src={slide.urls} alt="" />
                <h2 className="text-white text-2xl">{slide.title}</h2>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
