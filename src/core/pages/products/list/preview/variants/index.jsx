import React from "react";
import Placeholder from "../../../../../components/Placeholder";
import { Box, Typography, useTheme } from "@mui/material";
import { AiOutlineFileImage } from "react-icons/ai";
import { Collapse } from "react-collapse";

const Variants = ({
  variants,
  selectedOption,
  priceRef,
  setSubVariantIndex,
  setIsOpenSubvariants,
  setSubvariants,
  setFeaturesState,
  setIsOpenPrice,
  setSelectedOption,
  subvariantsRef,
  setPrice,
  isOpenVariants,
}) => {
  const theme = useTheme();

  const handleSubvariantBox = (placeholder, variant) => {
    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [placeholder]: variant.title,
    }));

    if (variant.subvariant && variant.subvariant.placeholder !== "") {
      setSubvariants(variant.subvariant);
      setSubVariantIndex(null);
    }

    if (variant.price) {
      setPrice([...variant.price]);
      setIsOpenPrice(true);
    }
   

    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [placeholder]: variant.title,
    }));

    if (
      variant.subvariant &&
      variant.subvariant.placeholder &&
      subvariantsRef.current
    ) {
      setIsOpenSubvariants(true);
      setIsOpenPrice(false);
      subvariantsRef.current.scrollIntoView({
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
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-[5rem]">
        <Placeholder text={variants.placeholder} />
      </div>
      <Collapse isOpened={isOpenVariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
          {variants?.value?.map((option, index) => (
            <Box
              key={index}
              sx={{
                border: `1px solid #fdf2f8`,
                bgcolor: "#fdf2f8",
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary[200]}`,
                },
                color: "black",

                ...(selectedOption[variants.placeholder] === option.title && {
                  border: `1px solid #701a75`,
                }),
              }}
              onClick={() => handleSubvariantBox(variants.placeholder, option)}
              className="relative p-5 rounded-md cursor-pointer flex flex-col gap-1 items-center"
            >
              {option.is_popular && (
                <span
                  style={{
                    color: theme.palette.text.primary,
                    background: theme.palette.secondary[700],
                  }}
                  className="absolute h-auto w-auto px-2 py-1 text-xs rounded-full top-2 right-2"
                >
                  Popular
                </span>
              )}
              <div className="w-[100px] h-[100px] relative">
                {option.photo ? (
                  <img
                    src={option.photo}
                    alt="format"
                    className="w-full h-full absolute"
                  />
                ) : (
                  <AiOutlineFileImage className="w-full h-full" />
                )}
              </div>

              <Typography align="center" className="font-bold text-lg">
                {option.title}
              </Typography>
              <Typography align="center" className="text-xs">
                {option.description}
              </Typography>
            </Box>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Variants;
