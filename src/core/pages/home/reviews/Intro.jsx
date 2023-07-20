import React from "react";
import google from "../../../assets/google.png";
import { Typography } from "@mui/material";
import Rating from "./Rating";

const Intro = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <a
        className=""
        href="https://www.google.com/search?hl=en-US&gl=us&q=1+Brooke+Rd,+%2301-01+Value+Printing+Pte+Ltd+-+Printing+Service+in+Singapore,+Katong+Plaza,+Singapore+429979&ludocid=8157670987727994668&lsig=AB86z5Vu9lWIxqkXLklYhhTR3OUC&hl=en&gl=US#lrd=0x31da3d4ec5f16a61:0x7135de8aca097f2c,1"
        target="_blank"
        rel="noreferrer"
      >
        <img src={google} alt="google" className="w-[180px] h-[180]" />
      </a>
      <div className="w-full flex justify-center">
        <Rating height="1rem" width="1rem" />
      </div>
      <Typography className="text-gray-700 text-lg mt-4">
        <span className="font-bold text-black">5/5 stars</span> based on 32 reviews
      </Typography>
    </div>
  );
};

export default Intro;
