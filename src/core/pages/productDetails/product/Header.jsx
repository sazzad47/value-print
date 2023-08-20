import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ product }) => {
  return (
    <div className="w-full flex bg-gray-200 p-3">
      <div className="w-[40%] min-h-full flex items-center justify-center">
        <img src={product.intro_photo} alt="" className="w-full aspect-auto" />
      </div>
      <div className="w-[60%] flex flex-col justify-start p-5 pl-[2rem]">
        <h1 className="uppercase text-[15px] font-medium">
          {" "}
          {product.slogan}{" "}
        </h1>
        <h1 className="text-[24px] font-bold"> {product.name} </h1>
        <p> {product.short_description} </p>
        <Divider className="bg-pink-400 w-full my-5" />
        <p className="mb-2"> Perfect for: </p>
        <ul className="ml-4">
          {product.perfect_for.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ul>
        <div>
        <Link to={`/products/list/${product.id}`} className="no-underline">
        <button
          className="btn-grad mt-5 cursor-pointer"
        >
         Explore
        </button>
        </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Header;
