import React from "react";
import Wave from "../../components/wave";
import { Typography } from "@mui/material";
import Information from "./Information";

const Payment = () => {
  return (
    <div className="flex flex-col relative pb-[5rem]">
      <Wave />
      <Typography className="absolute text-white text-xl md:text-4xl font-bold top-[2rem] md:top-[5rem] left-[1rem] md:left-[5rem]">
        Payment
      </Typography>
      <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center">
        <div className="w-full text-center text-gray-900 my-[3rem]">
          <Typography className="text-gray-900 font-bold text-xl md:text-4xl">
          Secure Payment Options
          </Typography>
          <Typography className="text-gray-900 mt-1 font-bold text-sm">
          Choose Your Preferred Method and Complete Your Transaction Safely
          </Typography>
        </div>
       
        <div className="w-full">
            <Information/>
        </div>
      </div>
    </div>
  );
};

export default Payment;
