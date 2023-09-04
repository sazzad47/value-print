import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import Customize from "./Customize";
import GeneralPlaceholer from "../../../../../components/GeneralPlaceholer";
import Dropdown from "./Dropdown";
import GeneralPrice from "../generalPrice";

const GeneralFeatures = ({
  data,
  price,
  setPrice,
  features,
  setFeatures,
  featuresState,
  setFeaturesState,
}) => {

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
              price={price}
              setPrice={setPrice}
              featuresState={featuresState}
              setFeaturesState={setFeaturesState}
            />
          </Grid>
        </div>
      </Paper>
    </Box>
  );
};

export default GeneralFeatures;
