import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { Typography } from "@mui/material";

const ContactInfo = () => {
  return (
    <div className="w-full flex flex-col gap-5 min-h-full justify-between">
      <div
        style={{ borderBottom: "2px solid #701a75" }}
        className="w-full p-5 flex flex-col gap-2 bg-white items-center"
      >
        <BiSolidPhoneCall className="text-fuchsia-900 text-6xl" />
        <Typography className="text-xl font-bold text-pink-700">
          {" "}
          Phone{" "}
        </Typography>
        <Typography className="text-lg font-bold text-pink-700 text-center">
          {" "}
          +65 9012 1219{" "}
        </Typography>
      </div>
      <div
        style={{ borderBottom: "2px solid #701a75" }}
        className="w-full p-5 flex flex-col gap-2 bg-white items-center"
      >
        <AiOutlineMail className="text-fuchsia-900 text-6xl" />
        <Typography className="text-xl font-bold text-pink-700">
          {" "}
          Email{" "}
        </Typography>
        <Typography className="text-lg font-bold text-pink-700 text-center">
          {" "}
          sales@valueprint.com.sg{" "}
        </Typography>
      </div>
      <div
        style={{ borderBottom: "2px solid #701a75" }}
        className="w-full p-5 flex flex-col gap-2 bg-white items-center"
      >
        <MdLocationPin className="text-fuchsia-900 text-6xl" />
        <Typography className="text-xl font-bold text-pink-700">
          {" "}
          Address{" "}
        </Typography>
        <Typography className="text-lg font-bold text-pink-700 text-center">
          {" "}
          1 Brooke Road #01-01 Katong Plaza Singapore 429979{" "}
        </Typography>
      </div>
    </div>
  );
};

export default ContactInfo;
