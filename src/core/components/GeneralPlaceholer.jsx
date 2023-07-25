import React from "react";

const GeneralPlaceholer = ({ text, className }) => {
  return (
    <div className={`text-gray-800 ${className}`}>
      <span>{text}</span>
    </div>
  );
};

export default GeneralPlaceholer;
