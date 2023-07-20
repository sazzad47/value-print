import React from "react";
import { Typography } from "@mui/material";

const CategoryInfo = ({category}) => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 min-h-full bg-white flex flex-col p-[1rem] md:p-[5rem]">
        <div className="w-full flex">
          <div
            style={{ borderBottom: "3px solid #701a75" }}
            className="w-auto pb-3"
          >
            <h3 className="text-3xl text-gray-900 font-bold capitalize">
             {category.name}
            </h3>
          </div>
        </div>
        <div className="mt-5">
          <Typography className="text-gray-900">
            {category.information}
          </Typography>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[30rem] relative ">
        <img src={category.photo} alt="" className="w-full h-full absolute" />
      </div>
    </div>
  );
};

export default CategoryInfo;
