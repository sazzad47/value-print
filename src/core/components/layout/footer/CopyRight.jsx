import React from "react";
import { Typography } from "@mui/material";

const CopyRight = () => {
  return (
    <div className="w-full h-[5vh] flex items-center justify-center text-gray-200 bg-fuchsia-900">
      <Typography>
      Copyright © {new Date().getFullYear()} Value Printing Pte Ltd
        </Typography>
        
    </div>
  );
};

export default CopyRight;
