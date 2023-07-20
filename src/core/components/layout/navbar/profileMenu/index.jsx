import React, { useState } from "react";
import { ClickAwayListener } from "@mui/base";
import { CSSTransition } from "react-transition-group";
import { Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Grid>
          <IconButton onClick={() => setOpen(!open)} className="p-0 m-0">
            <AiOutlineMenuUnfold className="text-3xl md:text-5xl text-fuchsia-900" />
          </IconButton>
          <CSSTransition
            in={open}
            unmountOnExit
            timeout={500}
            classNames="menu-primary"
          >
            <DropdownMenu setOpen={setOpen} />
          </CSSTransition>
        </Grid>
      </ClickAwayListener>
    </React.Fragment>
  );
};

function DropdownMenu({ setOpen }) {
  return (
    <div
      style={{ border: "1px solid #fce7f3" }}
      className="z-[1000] side-menu bg-white h-full fixed overflow-y-auto border border-gray-300 p-3"
    >
      <div className="w-full flex justify-end">
        <IconButton aria-label="close" onClick={() => setOpen(false)}>
          <CloseIcon className="text-gray-900" />
        </IconButton>
      </div>
      <div className="w-full flex flex-col items-center mt-10">
        <Link to="/#products" className="w-full">
          <button
            className="w-full cursor-pointer mb-2 inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            See Products
          </button>
        </Link>
        <div
          style={{ borderBottom: "1px solid #fce7f3" }}
          className="w-full py-2 mt-5"
        >
          <Link
            to="/about"
            className="no-underline text-gray-900 hover:text-fuchsia-900"
          >
            About Us
          </Link>
        </div>
        <div
          style={{ borderBottom: "1px solid #fce7f3" }}
          className="w-full py-2"
        >
          <Link
            to="/contact"
            className="no-underline text-gray-900 hover:text-fuchsia-900"
          >
            Contact Us
          </Link>
        </div>
        <div
          style={{ borderBottom: "1px solid #fce7f3" }}
          className="w-full py-2"
        >
          <Link
            to="/payment"
            className="no-underline text-gray-900 hover:text-fuchsia-900"
          >
            Payment
          </Link>
        </div>
        <div
          style={{ borderBottom: "1px solid #fce7f3" }}
          className="w-full py-2"
        >
          <Link
            to="/faq"
            className="no-underline text-gray-900 hover:text-fuchsia-900"
          >
            FAQ
          </Link>
        </div>
        <Typography className="mt-5 font-bold text-fuchsia-900 text-md">
          HOW TO REACH US
        </Typography>
        <div className="w-full flex justify-start text-gray-900 items-center gap-3 mt-3">
          <BiPhoneCall className="text-gray-900 text-xl" />{" "}
          <Typography> +65 9012 1219 </Typography>
        </div>
        <Typography className="mt-5 font-bold text-fuchsia-900 text-md">
          FOLLOW US
        </Typography>
        <div className="w-full justify-start mt-3 flex gap-2 items-center text-3xl leading-3">
          <a
            href="https://www.facebook.com/valueprint.com.sg"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <BiLogoFacebookSquare className="text-gray-800" />
          </a>
          <a
            href="https://www.instagram.com/valueprint.com.sg"
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineInstagram className="text-gray-800" />
          </a>
          <a
            href="https://www.linkedin.com/company/valueprintltd"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn className="text-gray-800" />
          </a>
          <a
            href="https://twitter.com/valueprintsg"
            target="_blank"
            rel="noreferrer"
          >
            <BsTwitter className="text-gray-800" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
