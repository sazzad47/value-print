import { Typography } from "@mui/material";
import React from "react";
import { BsFillClockFill } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
import {GiHumanTarget} from "react-icons/gi";
import {MdPriceCheck} from "react-icons/md";

const WhyLove = () => {
  return (
    <div className="w-full h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] bg-white">
      <div className="w-full flex flex-col gap-[3rem]">
        <div>
          <h3 className="text-3xl font-bold text-center text-fuchsia-900">
            Why Our Clients Love Us
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
          <div className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center hover:bg-pink-100 transition-colors duration-300 ease-in-out">
            <BsFillClockFill className="text-fuchsia-900 text-6xl" />
            <Typography className="text-xl font-bold text-pink-700">
              Express printing available (less than 48 hours)
            </Typography>
          </div>
          <div className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center hover:bg-pink-100 transition-colors duration-300 ease-in-out">
            <GiHumanTarget className="text-fuchsia-900 text-6xl" />
            <Typography className="text-xl font-bold text-pink-700">
              "Human" customer support (not another web-to-print!)
            </Typography>
          </div>
          <div className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center hover:bg-pink-100 transition-colors duration-300 ease-in-out">
            <AiFillPrinter className="text-fuchsia-900 text-6xl" />
            <Typography className="text-xl font-bold text-pink-700">
              Fast turnaround time
            </Typography>
          </div>
          <div className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center hover:bg-pink-100 transition-colors duration-300 ease-in-out">
            <MdPriceCheck className="text-fuchsia-900 text-6xl" />
            <Typography className="text-xl font-bold text-pink-700">
              Direct-from-factory prices
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyLove;
