import React, { useEffect } from "react";
import Service from "./Service";
import Product from "./products";
import Reviews from "./reviews";
import Banner from "./banner";
import BottomBanner from "./bottomBanner";
import WhyLove from "./WhyLove";
import About from "./About";
import { useLocation } from "react-router-dom";
import Quotation from "./quote";
import Faq from "./faq";
// import Blogs from "./blogs";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#products") {
      const productSection = document.getElementById("product-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="z-[-1]">
      <Banner />
      <About />
      <Service />
      <div id="product-section">
        <Product />
      </div>
      <Reviews />
      <WhyLove />
      <Quotation/>
      <Faq/>
      {/* <Blogs/> */}
      <BottomBanner />
    </div>
  );
};

export default Home;
