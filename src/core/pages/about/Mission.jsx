import React from "react";
import { Typography } from "@mui/material";

const Mission = () => {
  return (
    <div className="w-full flex">
      <div className="w-full min-h-full bg-white flex flex-col p-3 md:p-5">
        <div className="w-full flex">
          <div
            style={{ borderBottom: "3px solid #701a75" }}
            className="w-auto pb-3"
          >
            <h3 className="text-3xl text-gray-900 font-bold capitalize">
              {" "}
              Our Mission
            </h3>
          </div>
        </div>
        <div className="mt-5">
          <Typography className="text-gray-900">
            Our mission is to provide exceptional printing services that exceed
            our customers' expectations. We strive to deliver high-quality
            prints with attention to detail and precision, ensuring that every
            project reflects the utmost professionalism and creativity. Through
            continuous innovation and the utilization of advanced printing
            technologies, we aim to be at the forefront of the industry,
            offering a wide range of printing solutions tailored to our clients'
            diverse needs. With a commitment to sustainability, we embrace
            eco-friendly practices and materials, minimizing our environmental
            impact while delivering outstanding results. Our mission is to be
            the go-to printing service that inspires and empowers individuals,
            businesses, and organizations to bring their visions to life on
            paper.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Mission;
