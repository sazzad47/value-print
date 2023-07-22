import React from "react";
import cartEmpty from "../../assets/empty-cart.jpg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="px-[1rem] md:px-[5rem] py-[5rem] w-full">
      <div className="w-full p-5 md:p-10 flex justify-center items-center bg-white">
        <div className="flex flex-col gap-5 w-[400px] max-w-full">
          <img src={cartEmpty} alt="" className="w-full h-auto" />
          <Typography align="center" className="text-gray-900 text-xl">
            Your cart is currently empty. <Link to="/#products" className="no-underline">Start browsing</Link> our printing services
            and products to add items to your cart.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
