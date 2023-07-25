import React, { useState } from "react";
import { Typography } from "@mui/material";
import Customize from "./Customize";
import { MdLocationOn } from "react-icons/md";
import deliveryPhoto from "../../../../../assets/delivery.svg";
import { IoIosCheckmarkCircle } from "react-icons/io";
import UploadArtwork from "../UploadArtwork";

const GeneralPrice = ({
  data,
  price,
  setPrice,
  featuresState,
  setFeaturesState,
}) => {
  const [currentIndex, setCurrentIndex] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [hoveredStdPrice, setHoveredStdPrice] = useState(false);
  const [hoveredExpPrice, setHoveredExpPrice] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = (index) => {
    setCurrentIndex(index);
  };

  const handleQuantityChange = (prop) => {
    const { price, quantity, delivery } = prop;

    setFeaturesState({
      ...featuresState,
      price: price,
      quantity: quantity,
      delivery_type: delivery,
    });

    setOpen(true)
  };

   

  function calculateDeliveryCharge(quantity) {
    // Define the known quantities and delivery charges
    const minQuantity = price[0]?.quantity;
    const maxQuantity = price[price.length - 1]?.quantity;
    const minDeliveryCharge = 20;
    const maxDeliveryCharge = 30;

    // Calculate the slope and intercept of the line
    const slope =
      (maxDeliveryCharge - minDeliveryCharge) / (maxQuantity - minQuantity);
    const intercept = minDeliveryCharge - slope * minQuantity;

    // Calculate the delivery charge using linear interpolation
    const deliveryCharge = Math.round(slope * quantity + intercept);

    // Ensure the delivery charge is within the desired range (0 to 10)
    return Math.max(20, Math.min(30, deliveryCharge));
  }

  console.log("featuresState", featuresState);
  return (
    <>
      <div className="w-full flex justify-between my-[2rem]">
        <div className="flex items-end">
          <MdLocationOn className="text-fuchsia-600 text-6xl" />
          <div className="flex flex-col gap-2">
            <Typography className="text-gray-500 font-bold text-xl">
              {" "}
              Location{" "}
            </Typography>
            <Typography className="text-gray-900 font-semibold text-2xl">
              {" "}
              Singapure City{" "}
            </Typography>
          </div>
        </div>
        <Customize data={data} price={price} setPrice={setPrice} />
      </div>
      {/* <Box className="mb-[2rem]">
        <div className="bg-[#fdf2f8] text-gray-800 flex items-start text-sm gap-2 px-3 py-2 rounded-lg">
          <BsInfoCircle className="text-lg" />
          <Typography>
            Prices quoted are for one design only. Should you have multiple
            designs, add multiple items to your cart before checkout.
          </Typography>
        </div>
      </Box> */}

      <div className="w-full flex">
        <div className="w-[25%] flex flex-col gap-2">
          <div className="w-full flex justify-center">
            <img src={deliveryPhoto} alt="" width={100} height={100} />
          </div>
          <div
            style={{
              borderBottom: "1px solid #d4d4d8",
              borderLeft: "1px solid #d4d4d8",
            }}
          >
            <div className="w-full px-3 py-2 bg-[#d4d4d8] text-gray-800 font-bold text-lg text-center">
              Quantities
            </div>
            {price.map((item, index) => (
              <div
                className={`flex ${
                  currentIndex === index && mouseEntered ? "bg-pink-100" : ""
                } gap-2 justify-center items-center h-[3rem] w-full cursor-pointer text-gray-800`}
                key={index}
              >
                {item.quantity} pieces
              </div>
            ))}
          </div>
        </div>
        <div className="w-[75%] flex flex-col">
          <div className="w-full px-3 py-2 bg-[#d4d4d8] text-gray-800 font-bold text-lg text-center">
            Printing Price (incl. Delivery Fee)
          </div>
          <div className="w-full grid grid-cols-2">
            <div
              style={{
                borderBottom: "1px solid #d4d4d8",
                borderLeft: "1px solid #d4d4d8",
                borderRight: "1px solid #d4d4d8",
              }}
              className="flex flex-col"
            >
              <div className="flex flex-col h-[6.7rem]">
                <h3 className="text-lg text-gray-800 text-center">Express</h3>
                <p className="font-medium text-sm text-gray-600 text-center">
                  {" "}
                  2 working days (excluding weekends)
                </p>
              </div>
              {price.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleQuantityChange({
                      price:
                        parseFloat(item.price) +
                        calculateDeliveryCharge(item.quantity),
                      quantity: item.quantity,
                      delivery: "Express",
                    })
                  }
                  onMouseEnter={() => {
                    handleMouseEnter(index);
                    setMouseEntered(true);
                    setHoveredExpPrice(true);
                  }}
                  onMouseLeave={() => {
                    setMouseEntered(false);
                    setHoveredExpPrice(false);
                  }}
                  className={`flex ${
                    (currentIndex === index && hoveredExpPrice) ||
                    featuresState["price"] ===
                      parseFloat(item.price) +
                        calculateDeliveryCharge(item.quantity)
                      ? "bg-pink-200"
                      : currentIndex === index && mouseEntered
                      ? "bg-pink-50"
                      : ""
                  } gap-2 justify-center items-center h-[3rem] w-full cursor-pointer`}
                >
                  <span
                    style={{ border: "1px solid #d4d4d8" }}
                    className="w-[20px] h-[20px] rounded-full"
                  >
                    {((currentIndex === index && hoveredExpPrice) ||
                      featuresState["price"] ===
                        parseFloat(item.price) +
                          calculateDeliveryCharge(item.quantity)) && (
                      <IoIosCheckmarkCircle className="w-full h-full text-fuchsia-800" />
                    )}
                  </span>
                  <div className="flex flex-col text-center">
                    <div className="text-gray-700 text-xs font-bold">
                      {" "}
                      S$
                      {parseFloat(item.price) +
                        calculateDeliveryCharge(item.quantity)}{" "}
                    </div>
                    <div className="text-gray-700 text-[0.6rem]">
                      {" "}
                      S$
                      {(
                        (parseFloat(item.price) +
                          calculateDeliveryCharge(item.quantity)) /
                        item.quantity
                      ).toFixed(2)}{" "}
                      per pieces{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderBottom: "1px solid #d4d4d8",
                borderLeft: "1px solid #d4d4d8",
              }}
              className="flex flex-col"
            >
              <div className="flex flex-col h-[6.7rem]">
                <h3 className="text-lg text-gray-800 text-center">Standard</h3>
                <p className="font-medium text-sm text-gray-600 text-center">
                  {" "}
                  7 working days (excluding weekends)
                </p>
              </div>
              {price.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleQuantityChange({
                      price: parseFloat(item.price) + 10,
                      quantity: item.quantity,
                      delivery: "Standard",
                    })
                  }
                  onMouseEnter={() => {
                    handleMouseEnter(index);
                    setMouseEntered(true);
                    setHoveredStdPrice(true);
                  }}
                  onMouseLeave={() => {
                    setMouseEntered(false);
                    setHoveredStdPrice(false);
                  }}
                  className={`flex ${
                    (currentIndex === index && hoveredStdPrice) ||
                    featuresState["price"] === parseFloat(item.price) + 10
                      ? "bg-pink-200"
                      : currentIndex === index && mouseEntered
                      ? "bg-pink-50"
                      : ""
                  } gap-2 justify-center items-center h-[3rem] w-full cursor-pointer`}
                >
                  <span
                    style={{ border: "1px solid #d4d4d8" }}
                    className="w-[20px] h-[20px] rounded-full"
                  >
                    {((currentIndex === index && hoveredStdPrice) ||
                      featuresState["price"] ===
                        parseFloat(item.price) + 10) && (
                      <IoIosCheckmarkCircle className="w-full h-full text-fuchsia-800" />
                    )}
                  </span>
                  <div className="flex flex-col text-center">
                    <div className="text-gray-700 text-xs font-bold">
                      {" "}
                      S${parseFloat(item.price) + 10}{" "}
                    </div>
                    <div className="text-gray-700 text-[0.6rem]">
                      {" "}
                      S$
                      {((parseFloat(item.price) + 10) / item.quantity).toFixed(
                        2
                      )}{" "}
                      per pieces{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <UploadArtwork
        featuresState={featuresState}
        setFeaturesState={setFeaturesState}
        open={open}
        setOpen={setOpen}

      />
    </>
  );
};

export default GeneralPrice;