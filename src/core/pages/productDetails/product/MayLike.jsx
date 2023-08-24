import React from "react";
import Carousel from "better-react-carousel";
import { Link } from "react-router-dom";

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
    cols: 3,
    rows: 1,
    gap: 10,
    loop: true,
    autoplay: 3000,
  },
];

export default function MayLike({ product, data }) {
  const productIndex = data.findIndex((item) => item.id === product.id);

  // Get up to 9 subsequent products, cycling back to the beginning if needed
  const subsequentProducts = [...data.slice(productIndex + 1), ...data].slice(0, 9);

  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-2xl md:text-4xl text-bold mb-5 mt-[5rem] may-like-heading">
        <span> You may also like </span>
      </h1>

      <div className="text-gray-900">
        <Carousel responsiveLayout={breakpoints}>
          {subsequentProducts.map((slide, index) => (
            <Carousel.Item key={index}>
              <div style={{ border: "1px solid #d6d3d1" }} className="bg-white p-3">
                <div>
                  <img
                    src={slide.intro_photo}
                    alt="idea"
                    className="w-full aspect-auto"
                  />
                </div>
                <div className="text-center p-3"> <Link to={`/products/${product.id}`}> {slide.name} </Link>  </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
