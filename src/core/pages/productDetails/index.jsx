import React from "react";
import ProductList from "./ProductLIst";

const Product = () => {
  return (
    <>
      <div
        id="products"
        className="w-full h-auto px-[1rem] md:px-[2rem] py-[2rem] md:py-[5rem]"
      >
        <div className="w-full flex flex-col gap-[3rem]">
          <div className="">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
