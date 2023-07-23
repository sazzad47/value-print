import React from "react";
import Categories from "./Categories";
import ProductList from "./ProductLIst";

const Product = () => {
  return (
    <>
      <div
        id="products"
        className="w-full h-auto px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] bg-white"
      >
        <div className="w-full flex flex-col gap-[3rem]">
          <div>
            <h3 className="text-3xl font-bold text-center text-fuchsia-900">
              Our Products
            </h3>
            <h3 className="text-2xl font-medium text-center text-pink-600 mt-2">
              Choose the best available products on the market
            </h3>
          </div>
          <div className="block md:hidden">
            <Categories />
          </div>
          <div className="hidden md:block">
            <ProductList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
