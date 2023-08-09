import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const rating = product.rating; // Set the rating dynamically (e.g., fetch it from the product object)

  const getRatingColor = (index) => {
    if (index < rating) {
      return "text-fuchsia-900";
    } else {
      return "text-gray-400 dark:text-gray-600";
    }
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starColor = getRatingColor(i);
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${starColor} mr-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="w-full h-full max-w-sm bg-pink-100 border border-gray-200 rounded-lg shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
      <div className="w-full h-[15rem] relative">
        <Link to="/">
          <img
            className="w-full h-full absolute"
            src={product.photo}
            alt={product.name}
          />
        </Link>
      </div>

      <div className="px-5 py-5 h-[calc(100%-15rem)] flex flex-col justify-between">
        <Link className="no-underline" to="/">
          <h5 className="no-underline text-xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">{renderRatingStars()}</div>
        <Typography className="text-xs italic text-gray-900">Starting at</Typography>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.starting_price}/{product.starting_quantity}pc
          </span>
          <Link
            to={`/products/list/${product.id}`}
            className="text-white no-underline bg-fuchsia-900 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
