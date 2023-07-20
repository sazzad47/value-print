import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Information from "./information";
import { Link } from "react-router-dom";

const Checkout = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  return (
    <div className="flex flex-col relative pb-[5rem]">
      <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center">
        <div className="w-full text-center text-gray-900 my-[3rem]">
          <Typography className="text-gray-900 font-bold text-xl md:text-4xl">
            Finalize Your Purchase
          </Typography>
          <Typography className="text-gray-900 mt-1 font-bold text-sm">
            Secure Checkout and Order Confirmation
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={8}
            order={{xs: 2, md:1}}
            className="flex justify-center items-center w-full h-full"
          >
            <div className="w-full bg-white center p-5">
                <Information/>
            </div> 
          </Grid>
          <Grid item xs={12} md={4} order={{xs: 1, md:2}}>
            <div className="w-full bg-white min-h-[50px] p-5 flex flex-col gap-5">
              <div className="w-full flex justify-between items-center">
                <Typography className="text-center text-gray-900 text-4xl font-bold">
                  {" "}
                  Summary{" "}
                </Typography>
                <Link to="/cart" className="no-underline">
                <Typography className="text-center text-gray-600 text-lg font-bold">
                  {cartItems.length} items
                </Typography>
                </Link>
              </div>
              <div className="hidden md:block">

              {cartItems.map((item, index) => (
                <div key={index} className="w-full flex bg-gray-200 p-2">
                  <div className="w-[30%]">
                    <div className="w-full h-[50px]">
                      <img
                        src={item.photo}
                        alt="product"
                        className="w-full h-full"
                      />
                    </div>
                  </div>{" "}
                  <div className="w-[70%] flex flex-col gap-1">
                    <h5 className="text-md font-bold text-gray-900">
                      {" "}
                      {item.name}{" "}
                    </h5>
                    <div className="w-full flex justify-between">
                      <h5 className="font-bold text-gray-900 text-xs">
                        {" "}
                        Price:{" "}
                      </h5>
                      <h5 className="font-bold text-gray-500 text-xs">
                        {" "}
                        ${item.price}{" "}
                      </h5>
                    </div>
                    <div className="w-full flex justify-between">
                      <h5 className="font-bold text-gray-900 text-xs">
                        {" "}
                        Quantity:{" "}
                      </h5>
                      <h5 className="font-bold text-gray-500 text-xs">
                        {" "}
                        {item.quantity}{" "}
                      </h5>
                    </div>
                  </div>
                 
                </div>
              ))}
              </div>
              <div className="w-full flex justify-between">
                <h5 className="font-bold text-gray-900 text-lg"> Total: </h5>
                <h5 className="font-bold text-gray-500 text-lg">
                  {" "}
                  ${totalPrice}{" "}
                </h5>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Checkout;
