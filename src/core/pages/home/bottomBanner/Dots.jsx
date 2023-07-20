import React from "react";

function Dots({ activeIndex, onclick, sliderImage }) {
  return (
    <div className="flex w-full justify-center">
      {sliderImage.map((slide, index) => (
        <img
          src={slide.urls}
          alt="banner"
          key={index}
          className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
          onClick={() => onclick(index)}
        />
      ))}
    </div>
  );
}

export default Dots;
