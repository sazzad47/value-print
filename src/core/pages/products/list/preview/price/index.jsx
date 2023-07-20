import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Placeholder from "../../../../../components/Placeholder";
import { BsInfoCircle } from "react-icons/bs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Collapse } from "react-collapse";
import Customize from "./Customize";

const Price = ({
  data,
  price,
  setPrice,
  featuresState,
  setFeaturesState,
  isOpen,
}) => {
  const theme = useTheme();
  const [selectedQuantity, setSelectedQuantity] = useState("");
 
  const handleQuantityChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedQuantity(selectedValue);
  
    // Find the price and quantity in the price array
    const selectedPrice = price?.find((item) => item.quantity === selectedValue);
  
    if (selectedPrice) {
      // Update the featuresState with price, quantity, and price per quantity
      setFeaturesState({
        ...featuresState,
        price: selectedPrice.price,
        quantity: selectedPrice.quantity,
      });
    }
   
  };
  

  const splitData = (price, numArrays) => {
    const sortedPrice = price.sort((a, b) => a.quantity - b.quantity);
    
    const dataLength = sortedPrice.length;
    const itemsPerArray = Math.floor(dataLength / numArrays);
  
    const arrays = Array.from({ length: numArrays }, (_, index) => {
      const startIndex = index * itemsPerArray;
      const endIndex = startIndex + itemsPerArray;
      return sortedPrice.slice(startIndex, endIndex);
    });
  
    const remainingItems = sortedPrice.slice(numArrays * itemsPerArray);
  
    return {
      array1: arrays[0],
      array2: arrays[1],
      array3: arrays[2],
      array4: remainingItems,
    };
  };
  

  const { array1, array2, array3, array4 } = splitData(price, 3);

  return (
    <>
      <div className="relative h-[5rem] w-full p-5">
        <Placeholder text="Quantity" />
      </div>
      <Collapse isOpened={isOpen}>
        <div className="w-full flex justify-end mt-5 px-5">
          <Customize data={data} price={price} setPrice={setPrice} />
        </div>
        <Box className="p-5">
          <div
            className="bg-[#fdf2f8] text-gray-800 flex items-start text-sm gap-2 px-3 py-2 rounded-lg"
          >
            <BsInfoCircle className="text-lg" />
            <Typography>
              Prices quoted are for one design only. Should you have multiple
              designs, add multiple items to your cart before checkout.
            </Typography>
          </div>
        </Box>
        <FormControl className="w-full">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedQuantity} 
            onChange={(event)=> handleQuantityChange(event)} 
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
              <div className="">
                {array1.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[700]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[700]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex items-start justify-between p-5"
                  >
                    <div className="flex flex-col gap-2">
                      <FormControlLabel
                        value={item.quantity}
                        control={<Radio />}
                        sx={{
                          "& .MuiButtonBase-root": {
                            margin: 0,
                            padding: 0,
                            marginRight: "7px",
                            color: "black"
                          },
                          "& .MuiSvgIcon-root": {
                            color: "black"
                          },
                        }}
                       
                        label={item.quantity}
                        className="text-gray-900"
                      />
                      <div className="relative">

                       {item.is_best_seller && (
                          <span
                            style={{
                              color: theme.palette.text.primary,
                              background: theme.palette.secondary[700],
                            }}
                            className="absolute h-auto w-auto px-2 py-1 text-xs whitespace-nowrap rounded-full -left-2"
                          >
                            Best Seller
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-gray-900 flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs">
                        {" "}
                        ${(item.price / item.quantity).toFixed(2)}/pc{" "}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </div>

              {/* Render the second container */}
              <div className="">
                {array2.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[700]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[700]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex items-start justify-between p-5"
                  >
                    <FormControlLabel
                      value={item.quantity}
                      control={<Radio />}
                      sx={{
                        "& .MuiButtonBase-root": {
                          margin: 0,
                          padding: 0,
                          marginRight: "7px",
                          color: "black"
                        },
                        "& .MuiSvgIcon-root": {
                          color: "black"
                        },
                      }}
                      label={item.quantity}
                      className="text-gray-900"
                    />

                    <div className="text-gray-900 flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs">
                        {" "}
                        ${(item.price / item.quantity).toFixed(2)}/pc{" "}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </div>

              {/* Render the third container */}
              <div className="">
                {array3.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[700]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[700]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex items-start justify-between p-5"
                  >
                    <FormControlLabel
                      value={item.quantity}
                      control={<Radio />}
                      sx={{
                        "& .MuiButtonBase-root": {
                          margin: 0,
                          padding: 0,
                          marginRight: "7px",
                          color: "black"
                        },
                        "& .MuiSvgIcon-root": {
                          color: "black"
                        },
                      }}
                      label={item.quantity}
                      className="text-gray-900"
                    />

                    <div className="text-gray-900 flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs">
                        {" "}
                        ${(item.price / item.quantity).toFixed(2)}/pc{" "}
                      </Typography>
                    </div>
                  </Box>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
              {array4.map((item, index) => (
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary[700]}`,
                    borderTop: 0,
                  }}
                  key={index}
                  className="w-full flex items-start justify-between p-5"
                >
                  <FormControlLabel
                    value={item.quantity}
                    control={<Radio />}
                    sx={{
                      "& .MuiButtonBase-root": {
                        margin: 0,
                        padding: 0,
                        marginRight: "7px",
                        color: "black"
                      },
                      "& .MuiSvgIcon-root": {
                        color: "black"
                      },
                    }}
                    label={item.quantity}
                    className="text-gray-900"
                  />
                  <div className="flex flex-col gap-2">
                    <Typography className="font-bold">
                      {" "}
                      ${item.price}
                    </Typography>
                    <Typography className="text-xs">
                      {" "}
                      ${(item.price / item.quantity).toFixed(2)}/pc{" "}
                    </Typography>
                  </div>
                </Box>
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </Collapse>
    </>
  );
};

export default Price;
