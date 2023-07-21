import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Collapse } from "react-collapse";
import Placeholder from "../../../../../components/Placeholder";
import { GiDeliveryDrone } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";

const DeliveryType = ({
  isOpenDelivery,
  featuresState,
  setFeaturesState,
  price,
}) => {

  const types = [
    {
      id: 1,
      title: "Standard",
      description: "5 Working days excluding weekends",
      icon: <CiDeliveryTruck className="w-full h-full" />,
      charge: 10
    },
    {
      id: 2,
      title: "Express",
      description: "2 Working days excluding weekends",
      icon: <GiDeliveryDrone className="w-full h-full" />,
      charge: calculateDeliveryCharge(featuresState.quantity)
    },
  ];
  
  const theme = useTheme();

  const handleClick = (item) => {
    setFeaturesState({
      ...featuresState,
      delivery_type: item.title,
      deliver_charge: item.charge,
      total_amount: parseFloat(featuresState.price) + parseFloat(item.charge),
    });
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

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-[5rem]">
        <Placeholder text="Delivery Type" />
      </div>
      <Collapse isOpened={isOpenDelivery}>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 px-5 mt-[1rem]">
          {types.map((item, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "#fdf2f8",
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary[200]}`,
                },
                color: "black",
                border:
                  featuresState["delivery_type"] === item.title
                    ? `1px solid #701a75`
                    : "1px solid #fdf2f8",
              }}
              onClick={() => handleClick(item)}
              className="relative p-5 rounded-md cursor-pointer flex flex-col gap-1 items-center"
            >
              <div className="w-[100px] h-[100px] relative">{item.icon}</div>

              <Typography align="center" className="font-bold text-lg">
                {item.title}
              </Typography>
              <Typography align="center" className="text-xs">
                {item.description}
              </Typography>
              <Typography align="center" className="text-xs">
                Charge: ${item.charge}
              </Typography>
            </Box>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default DeliveryType;
