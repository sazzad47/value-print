import { Box } from "@mui/material";
import React from "react";

const Information = ({ data }) => {
  return (
    <div className="w-fll h-full flex flex-col justify-between">
      <Box className="text-gray-900 whitespace-pre-wrap">{data.information}</Box>
    </div>
  );
};

export default Information;
