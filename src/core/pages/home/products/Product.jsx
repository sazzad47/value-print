import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
 
  return (
    <div className="w-full h-full max-w-sm bg-pink-100 border border-gray-200 rounded-lg shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
      <Link to={`/products/${product.id}`} className="no-underline">
        <div className="w-full h-[10rem] relative">
          <Link to={`/products/${product.id}`}>
            <img
              className="w-full h-full absolute"
              src={product.photo}
              alt={product.name}
            />
          </Link>
        </div>

        <div className="px-2 py-5 flex flex-col justify-between">
          <Link className="no-underline" to="/">
            <h5 className="no-underline text-xl text-center font-semibold tracking-tight text-gray-900">
              {product.name}
            </h5>
          </Link>  
        </div>
      </Link>
    </div>
  );
};

export default Product;
