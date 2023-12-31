import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Intro from "./Intro";
import { useNavigate } from "react-router-dom";

export default function Details({ product, data }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "100%",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="visible arrows tabs example"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#701a75",
              display: "none",
            },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "center",
              
              flexWrap: 'wrap',
            },
            "& button": {
              color: "black",
              textTransform: "capitalize",
              fontSize: "1rem",
              backgroundColor: "#fce7f3",
              marginRight: "1rem",
              marginTop: "1rem",
              borderRadius: "40px",
              // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
            },
            "& button:focus": { outline: "none" },
            "& button.Mui-selected": {
              backgroundColor: "#f472b6",
            },
            borderTop: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tab label="Product Details" />
          <Tab label="Product Specs" />
          <Tab label="Artwork Specs" />
          <Tab label="Product Size Template" />
          <Tab
            onClick={() => navigate(`/products/list/${product.id}`)}
            label="Price List"
          />

          <Tab onClick={() => navigate('/delivery-schedule')} label="Delivery Schedule" /> 
        </Tabs>
        <TabPanel value={value} index={0}>
          <Intro product={product} data={data} />
        </TabPanel>
      </Box>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="">{children}</div>}
    </div>
  );
}
