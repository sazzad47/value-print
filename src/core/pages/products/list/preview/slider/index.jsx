import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const CoverPhotos = ({ coverPhotos }) => {
  return (
    <div className="w-full h-full pl-0 md:pl-2">
      <Swiper
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="relative w-full h-full"
      >
        {coverPhotos.map((img) => {
          return (
            <SwiperSlide className="w-full min-h-full">
              <div className="w-full h-[20rem] md:h-full">
                <img
                  src={img}
                  alt="cover"
                  className="object-cover w-full h-full block"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CoverPhotos;
