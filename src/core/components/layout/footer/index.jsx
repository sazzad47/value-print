import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../state/api/product";
import CopyRight from "./CopyRight";
import { MasterCard, Paypal, Visa } from "./SvgIcons";
import logo from "../../../assets/logo.png";
import { Box, Typography } from "@mui/material";
import Map from "./Map";
import { Oval } from "react-loader-spinner";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  const { data, isLoading } = useGetCategoriesQuery({});

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <footer className="w-full h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] bg-white">
          <div className="w-full grid grid-cols-1 md:grid-cols-3">
            <Box
              sx={{ borderRight: 0, md: { borderRight: "1px solid #ffe4e6" } }}
              className="w-full flex justify-start"
            >
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl text-fuchsia-900">
                  Printing Services
                </h3>
                <div className="flex flex-col gap-3">
                  {data?.slice(0, 10).map((item, index) => (
                    <Link
                      className="no-underline text-gray-800"
                      key={index}
                      to={`/products/list/${item.name.replace("/", "-")}`}
                    >
                      <div> {item.name} </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Box>
            <Box
              sx={{ borderRight: 0, md: { borderRight: "1px solid #ffe4e6" } }}
              className="w-full px-0 md:px-[3rem] mt-[2rem] md:mt-0"
            >
              <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl text-fuchsia-900">
                  Value Print
                </h3>
                <div className="flex flex-col gap-3">
                  <Link className="no-underline text-gray-800" to="/">
                    <div> Home</div>
                  </Link>
                  <Link className="no-underline text-gray-800" to="/about">
                    <div> About Us</div>
                  </Link>
                  <Link className="no-underline text-gray-800" to="/contact">
                    <div> Contact Us</div>
                  </Link>
                  <Link className="no-underline text-gray-800" to="/payment">
                    <div> Payment</div>
                  </Link>
                  <Link className="no-underline text-gray-800" to="/faq">
                    <div> FAQ</div>
                  </Link>
                  <h3 className="font-bold text-xl text-fuchsia-900">
                    Connect With Us!
                  </h3>
                  <div className="flex gap-2 items-center text-2xl leading-3">
                    <a
                      href="https://www.facebook.com/valueprint.com.sg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      <BiLogoFacebookSquare className="text-gray-800" />
                    </a>
                    <a
                      href="https://www.instagram.com/valueprint.com.sg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiOutlineInstagram className="text-gray-800" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/valueprintltd"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedinIn className="text-gray-800" />
                    </a>
                    <a
                      href="https://twitter.com/valueprintsg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsTwitter className="text-gray-800" />
                    </a>
                  </div>
                  <h3 className="font-bold text-xl text-fuchsia-900">
                    We Accept:
                  </h3>
                  <div className="flex gap-2 -mt-4">
                    <div className="">
                      <Paypal />
                    </div>
                    <div className="">
                      <Visa />
                    </div>
                    <div className="">
                      <MasterCard />
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <div className="w-full justify-center px-0 md:px-[3rem] mt-[2rem] md:mt-0">
              <div className="w-full flex justify-center">
                <img src={logo} height={50} width={80} alt="" />
              </div>
              <div className="flex flex-col gap-3 text-gray-800 pt-5">
                <Typography>
                  <span className="text-fuchsia-900 font-bold">Address:</span> 1
                  Brooke Road #01-01 Katong Plaza Singapore 429979
                </Typography>
                <Typography>
                  {" "}
                  <span className="text-fuchsia-900 font-bold">
                    Email:
                  </span>{" "}
                  sales@valueprint.com.sg
                </Typography>
                <Typography>
                  {" "}
                  <span className="text-fuchsia-900 font-bold">Phone:</span> +65
                  9012 1219
                </Typography>
              </div>
              <div className="w-full h-[10rem] relative">
                <Map />
              </div>
            </div>
          </div>
        </footer>
      )}
      <CopyRight />
    </>
  );
};

export default Footer;
