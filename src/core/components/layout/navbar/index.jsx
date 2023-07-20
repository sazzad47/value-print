import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { BsViewList, BsPersonFillLock } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import ProductLIst from "./ProductLIst";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { IconButton, useMediaQuery } from "@mui/material";
import ContactInfo from "./ContactInfo";
import { Link } from "react-router-dom";
import Drawer from "./profileMenu";
import { useGetProductsQuery } from "../../../state/api/product";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";

const Navbar = () => {
  const { access_token } = useSelector((state) => state.global);
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { isLoading } = useGetProductsQuery({});
  return (
    <>
      <div className="z-[10]">
        <ContactInfo />
      </div>
      <nav className="bg-white border-gray-300 z-[10]">
        <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              height={isNonMobile ? 50 : 40}
              width={isNonMobile ? 80 : 70}
              className="mr-3"
              alt="Logo"
            />
          </Link>
          <ul className="hidden md:flex list-none flex-row font-medium md:space-x-8">
            <li className="flex items-center">
              {isLoading ? (
                <ThreeDots
                  height="30"
                  width="30"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <button
                  onClick={() => setOpen(!open)}
                  className={`dropdown ${
                    open ? "active" : ""
                  } px-5 py-2 flex gap-2 h-[3rem] text-lg text-white cursor-pointer items-center font-medium bg-fuchsia-900 rounded-full hover:bg-primaryBtnHoverBg md:mr-0`}
                  type="button"
                >
                  <BsViewList color="white" />
                  Products
                  <span className="arrow"></span>
                </button>
              )}
            </li>
            <li className="">
              <SearchBar />
            </li>
          </ul>
          <ul className=" flex list-none font-medium items-center space-x-8">
            <li>
              <Cart />
            </li>
            <li>
              {access_token ? (
                <Link to="/account">
                  <IconButton className="p-0 m-0">
                    <BiSolidUser className="text-3xl md:text-5xl text-fuchsia-900" />
                  </IconButton>
                </Link>
              ) : (
                <Link to="/login">
                  <IconButton className="p-0 m-0">
                    <BsPersonFillLock className="text-3xl md:text-5xl text-fuchsia-900" />
                  </IconButton>
                </Link>
              )}
            </li>

            <li>
              <Drawer />
            </li>
          </ul>
        </div>
      </nav>
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={500}
        classNames="nav-product-items"
      >
        <ProductLIst setOpen={setOpen} />
      </CSSTransition>
    </>
  );
};

export default Navbar;
