import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Billing from "./billingAddress/BillingAddress";
import ChangePassword from "./changePassword";
import Layout from "../Layout";

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
      {value === index && <div className="py-4">{children}</div>}
    </div>
  );
}

const Settings = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className="">
        <Tabs
          TabIndicatorProps={{
            sx: {
              backgroundColor: "transparent",
            },
          }}
          sx={{
            "& button": { color: "#111827", backgroundColor: "#e5e7eb", marginRight: "1rem" },
            "& button:focus": { outline: "none" },
            "& button.Mui-selected": {
              color: "#00f6ff",
              backgroundColor: "#701a75",
            },

          }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label="Billing Address" />
          <Tab label="Change Password" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Billing />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ChangePassword />
        </TabPanel>
      </div>
    </Layout>
  );
};

export default Settings;
