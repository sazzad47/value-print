import React, { useRef, useState } from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import Ribbon from "../../../../../components/Ribbon";
import Placeholder from "../../../../../components/Placeholder";
import Customize from "./Customize";
import { AiOutlineFileImage } from "react-icons/ai";
import { Collapse } from "react-collapse";
import Price from "../price";
import DeliveryType from "../deliveryTypes";
import Subvariants from "../subvariants";
import Variants from "../variants";
import GeneralPlaceholer from "../../../../../components/GeneralPlaceholer";
import Dropdown from "./Dropdown";
import GeneralPrice from "../generalPrice";

const GeneralFeatures = ({
  data,
  price,
  setPrice,
  features,
  setFeatures,
  variants,
  subvariants,
  setSubvariants,
  featuresState,
  setFeaturesState,
}) => {
  const theme = useTheme();
  const priceRef = useRef(null);
  const featureDivRef = useRef(null);
  const variantsRef = useRef(null);
  const subvariantsRef = useRef(null);
  const deliveryRef = useRef(null);
  const [isOpenVariants, setIsOpenVariants] = useState(false);
  const [isOpenSubvariants, setIsOpenSubvariants] = useState(false);
  const [subVariantIndex, setSubVariantIndex] = useState(null);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [isOpenDelivery, setIsOpenDelivery] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const handleBoxClick = (placeholder, title, index) => {
    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [placeholder]: title,
    }));

    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [placeholder]: title,
    }));

    const nextPlaceholderIndex = index + 1;
    const nextOptionsContainer = document.getElementById(
      `options-container-${nextPlaceholderIndex}`
    );

    if (nextOptionsContainer) {
      nextOptionsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (nextPlaceholderIndex === features.length) {
      if (data.variants.placeholder !== "") {
        setIsOpenVariants(true);
        variantsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        setIsOpenPrice(true);
        priceRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  console.log("features", features);

  return (
    <Box
      position=""
      sx={{ display: "flex", flexDirection: "column", gap: "5rem" }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          position: 'relative',
        }}
      >
        <GeneralPlaceholer className="optionHeading" text="1. Choose your options" />

        <div className="px-[20px] py-[20px]">
          <Grid className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            {features?.map((item, placeholderIndex) => {
              return (
                <>
                  <Grid
                    key={placeholderIndex}
                    id={`options-container-${placeholderIndex}`}
                    className="w-full flex flex-col gap-3"
                  >
                    <h2 className="text-fuchsia-900 font-bold text-lg">
                      {" "}
                      {item.placeholder}{" "}
                    </h2>
                    <Dropdown
                      item={item}
                      featuresState={featuresState}
                      setFeaturesState={setFeaturesState}
                    />
                  </Grid>
                  {item.allow_customize && (
                    <Customize
                      placeholder={item.placeholder}
                      setFeatures={setFeatures}
                      setFeaturesState={setFeaturesState}
                    />
                  )}
                </>
              );
            })}
          </Grid>
        </div>
      </Paper>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "white",
          position: 'relative',
        }}
      >
        <GeneralPlaceholer className="quantityHeading" text="2. Choose Quantity & Delivery Speed" />

        <div className="px-[20px] py-[20px]">
          <Grid container className="w-full">
            <GeneralPrice 
              data={data}
              isOpen={isOpenPrice}
              price={price}
              setPrice={setPrice}
              featuresState={featuresState}
              setFeaturesState={setFeaturesState}
              setIsOpenDelivery={setIsOpenDelivery}
              deliveryRef={deliveryRef}
            />
          </Grid>
        </div>
      </Paper>
    </Box>
  );
};

export default GeneralFeatures;
