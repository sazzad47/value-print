import React from "react";
import animation from "./no-data.json";
import Lottie from "lottie-react";

const NoResult = () => {
  return (
    <div className="w-full p-5">
      <Lottie animationData={animation} loop={true} />;
    </div>
  );
};

export default NoResult;
