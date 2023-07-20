import { Grid } from "@mui/material";
import React from "react";
import Biography from "./Biography";
import Expertise from "./Expertise";
import GeneralInfo from "./GeneralInfo";
import SocialLinks from "./SocialLinks";
import Education from "./Education";
import Profession from './Profession';

const Home = () => {
  return (
    <Grid className="mt-0 mb-5 grid grid-cols-1 md:grid-cols-2 w-full gap-5">
        <GeneralInfo />
        <Education/>
        <Profession/>
        <Expertise/>
        <Biography/>
        <SocialLinks/>
    </Grid>
  );
};

export default Home;
