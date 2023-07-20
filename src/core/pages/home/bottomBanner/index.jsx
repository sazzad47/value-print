import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import { sliderImage } from "./sliderImage";
import "./slider.css";
import Dots from "./Dots";

const len = sliderImage.length - 1;

function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="my-[5rem] md:my-[3rem]">
      <div className="slider-container">
        <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
      </div>
      <div className="mt-5">
        <Dots
          activeIndex={activeIndex}
          sliderImage={sliderImage}
          onclick={(activeIndex) => setActiveIndex(activeIndex)}
        />
      </div>
     
    </div>
  );
}

export default Slider;
