import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import { BiDuplicate } from "react-icons/bi";
import { addItem, deleteItem } from "../../state/api/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();   
  const { access_token } = useSelector((state) => state.global);
  const cartItems = useSelector((state) => state.cart.items);

  const handleDuplicateItem = (item) => {
    dispatch(addItem(item));
  };

  const handleDeleteItem = (index) => {
    dispatch(deleteItem(index));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );


useEffect(() => {
  const existingCartItems = JSON.parse(localStorage.getItem("cart"));
  if (existingCartItems && existingCartItems.length > 0) {
    existingCartItems.forEach((item) => {
      dispatch(addItem(item));
    });
  }

  return () => {
    localStorage.removeItem("cart");
  };

}, [dispatch]);


useEffect(() => {

    const cartItemsJSON = JSON.stringify(cartItems);
    localStorage.setItem("cart", cartItemsJSON);

}, [cartItems]);



  console.log("cartItems", cartItems);
  return (
    <div>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col relative pb-[5rem]">
          <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center">
            <div className="w-full text-center text-gray-900 my-[3rem]">
              <Typography className="text-gray-900 font-bold text-xl md:text-4xl">
                Shopping cart
              </Typography>
              <Typography className="text-gray-900 mt-1 font-bold text-sm">
                You have {cartItems.length} items in your cart
              </Typography>
            </div>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                md={8}
                className="flex justify-center items-center w-full h-full"
              >
                <div className="w-full bg-white center p-5">
                  {cartItems.map((item, index) => (
                    <div key={index} className="bg-gray-200 my-5">
                      <Grid container spacing={1} className="">
                        <Grid item xs={12} md={3}>
                          <div className="w-full h-full flex justify-start items-start">
                            <img
                              src={item.photo}
                              alt="product"
                              className="w-full h-[100px]"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={9} className="p-2">
                          <div className="w-full flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between md:justify-between items-center">
                              <h3 className="font-bold text-md text-start text-gray-900 mt-0">
                                {item.name}
                              </h3>
                              <div className="flex gap-3 items-center">
                                <Typography className="text-gray-900 font-bold text-xl"> ${item.price} </Typography>
                                <Tooltip title="Duplicate">
                                  <IconButton
                                    onClick={() => handleDuplicateItem(item)}
                                    className="text-gray-900"
                                  >
                                    <BiDuplicate />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() => handleDeleteItem(index)}
                                    className="text-gray-900"
                                  >
                                    <AiFillDelete />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                           <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row px-5 md:px-0">
                           <div className="w-full md:w-[50%] flex flex-col">
                            <h4 className="text-gray-600 mb-2 md:mb-0 font-bold text-sm text-center md:text-start">
                              {" "}
                              Configuration{" "}
                            </h4>
                            {Object.entries(item).map(([key, value]) => {
                              if (
                                key !== "name" &&
                                key !== "photo" &&
                                key !== "price" &&
                                key !== "quantity"
                              ) {
                                return (
                                  <div key={key}>
                                    <span className="text-gray-600 text-xs font-medium">
                                      {key}:
                                    </span>{" "}
                                    <span className="text-gray-900 text-xs">
                                      {value}
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                          <div className="w-full md:w-[20%] flex flex-col gap-2">
                          <h4 className="text-gray-600 font-bold text-sm text-center">
                              {" "}
                              Quantity{" "}
                            </h4>
                            <Typography className="text-gray-900 text-center"> {item.quantity} </Typography>
                          </div>
                          <div className="w-full md:w-[30%] flex flex-col gap-2">
                          <h4 className="text-gray-600 font-bold text-sm text-center">
                               Delivery Type
                            </h4>
                            <div className="text-center px-2 py-1 rounded-full bg-green-700 text-white">
                             Express
                            </div>
                            <div className="text-center text-gray-900">

                            2 working days (excluding weekends)
                            </div>
                          </div>
                           </div>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className="w-full bg-white min-h-[50px] p-5 flex flex-col gap-5">
                  <Typography className="text-center text-gray-900 text-4xl font-bold"> Checkout </Typography>
                  <div className="flex justify-between w-full text-gray-900">
                    <div className="text-xl font-bold"> Total </div> <div className="text-xl font-bold">${totalPrice} </div>
                  </div>
                  <button
                    className="mb-2 cursor-pointer inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={()=> navigate(`/${access_token? "checkout": "login"}`)}
                  >
                    Checkout
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
