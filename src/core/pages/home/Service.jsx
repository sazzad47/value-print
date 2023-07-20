import { Typography } from "@mui/material";
import React from "react";
import {BiSolidSelectMultiple} from "react-icons/bi";
import {BsFillCartCheckFill} from "react-icons/bs";
import {AiFillPrinter} from "react-icons/ai";
import {TbTruckDelivery} from "react-icons/tb";

const Service = () => {
  return (
   <div className="w-full h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] mb-[3rem] bg-white">
    <div className="w-full flex flex-col gap-[3rem]">
     <div>
      <h3 className="text-3xl font-bold text-center text-fuchsia-900">How We Work</h3>
      <h3 className="text-2xl font-medium text-center text-pink-600 mt-2">The easiest process ever</h3>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div style={{borderBottom: "2px solid #701a75"}} className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center">
           <BiSolidSelectMultiple className="text-fuchsia-900 text-6xl"/>
           <Typography className="text-xl font-bold text-pink-700">Select your options</Typography>
        </div>
        <div style={{borderBottom: "2px solid #701a75"}} className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center">
           <BsFillCartCheckFill className="text-fuchsia-900 text-6xl"/>
           <Typography className="text-xl font-bold text-pink-700">Add to cart</Typography>
        </div>
        <div style={{borderBottom: "2px solid #701a75"}} className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center">
           <AiFillPrinter className="text-fuchsia-900 text-6xl"/>
           <Typography className="text-xl font-bold text-pink-700">Proceed to print</Typography>
        </div>
        <div style={{borderBottom: "2px solid #701a75"}} className="w-full auto p-5 flex flex-col gap-5 bg-pink-50 items-center">
           <TbTruckDelivery className="text-fuchsia-900 text-6xl"/>
           <Typography className="text-xl font-bold text-pink-700">Deliver to you</Typography>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Service;
