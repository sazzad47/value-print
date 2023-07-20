import React from "react";
import aboutUs from "../../assets/about-us-page.png";
import { Typography } from "@mui/material";

const WhoWe = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 min-h-full bg-white flex flex-col p-3 md:p-5">
        <div className="w-full flex">
          <div
            style={{ borderBottom: "3px solid #701a75" }}
            className="w-auto pb-3"
          >
            <h3 className="text-3xl text-gray-900 font-bold capitalize">
              {" "}
              Who we are{" "}
            </h3>
          </div>
        </div>
        <div className="mt-5">
          <Typography className="text-gray-900">
            Value Print is “service oriented“ printing services company that
            invents and integrates design services, products and solutions that
            empower our customer profitability. We offer best customer
            experience, which include educating our customers to utilize our
            services and products to increase their profitability, productivity
            and efficiency. We offer wide selection of materials, and a high
            degree of flexibility to customize your albums and books to the
            finest detail.
          </Typography>
          <Typography className="text-gray-900 mt-3">
            We help you tailor whatever style that appeals to you, so you can
            freely express your creativity into a true reflection of your
            personal taste. As long as you can conceptualize the idea or sketch
            the design, we will be able to customize it for you. We use only
            quality archival materials to ensure our albums and books are acid
            and lignin free because we know that it is important to preserve
            your memorable moments in a manner that stands the test of time.
          </Typography>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-[30rem] relative ">
        <img src={aboutUs} alt="" className="w-full h-full absolute" />
      </div>
    </div>
  );
};

export default WhoWe;
