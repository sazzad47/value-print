import React from 'react'
import Placeholder from '../../../../../components/Placeholder';
import { Collapse } from 'react-collapse';
import { Box, Typography, useTheme } from '@mui/material';
import { AiOutlineFileImage } from "react-icons/ai";

const Subvariants = ({subvariants, isOpenSubvariants, subVariantIndex, setSubVariantIndex, setFeaturesState, setIsOpenPrice, priceRef, setPrice}) => {
   
    const theme = useTheme();

    const handleSubvariantBox = (placeholder, variant, index) => {
        setFeaturesState((prevFeaturesState) => ({
          ...prevFeaturesState,
          [placeholder]: variant.title,
        }));

        setSubVariantIndex(index)
  
        if (variant.price) {
          setPrice([...variant.price]);
        }
    
        setIsOpenPrice(true);
        priceRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

  return (
    <div className="flex flex-col gap-3" >
      <div className="relative h-[5rem]">
        <Placeholder text={subvariants.placeholder} />
      </div>
      <Collapse isOpened={isOpenSubvariants}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
          {subvariants?.value?.map((option, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "#fdf2f8",
                "&:hover": {
                  border: `1px solid ${theme.palette.secondary[200]}`,
                },
                color: "black",
                border:
                subVariantIndex === index
                    ? `1px solid #701a75`
                    : "1px solid #fdf2f8",
              }}
              onClick={() =>
                handleSubvariantBox(subvariants.placeholder, option, index)
              }
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
  )
}

export default Subvariants