import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import "./slider.css";
import Intro from "./Intro";
import { Button } from "@mui/material";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { reviewItems } from "./sliderImage";

const len = reviewItems.length - 1;

function Reviews(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="w-full h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem]">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[40%]">
          <Intro />
        </div>
        <div className="w-full md:w-[60%] flex flex-col">
          <div className="slider-container w-full">
            <SliderContent
              activeIndex={activeIndex}
              reviewItems={reviewItems}
            />
          </div>
          <div className="w-full mt-3 flex justify-end gap-3">
            <Button
              className="text-white bg-fuchsia-900 px-3 py-2"
              onClick={() =>
                setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
              }
            >
              <BiChevronLeft className="text-2xl" />
            </Button>
            <Button
              className="text-white bg-fuchsia-900 px-3 py-2"
              onClick={() =>
                setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
              }
            >
              <BiChevronRight className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
