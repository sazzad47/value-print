import React from "react";
import { Typography } from "@mui/material";
import Information from "./Faqs";

const Faq = () => {
  return (
    <div className="flex flex-col relative mb-[3rem]">
      <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center">
        <div className="w-full text-center text-gray-900 mt-[3rem]">
          <Typography className="text-3xl font-bold text-center text-fuchsia-900">
            Frequently Asked Questions
          </Typography>
          <Typography className="text-2xl font-medium text-center text-pink-600 mt-2">
            Find Answers to Common Inquiries About Our Products and Services
          </Typography>
        </div>

        <div className="w-full">
          <Information />
        </div>
      </div>
    </div>
  );
};

export default Faq;
