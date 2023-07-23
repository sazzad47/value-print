import React, { useState } from "react";
import { useGetProductsQuery } from "../../../state/api/product";
import { BiChevronRight } from "react-icons/bi";
import { Oval } from "react-loader-spinner";
import Product from "./Product";
import { useEffect } from "react";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const [products, setProducts] = useState(data);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // Extracting unique categories from products
  const uniqueCategories = [
    "All",
    ...Array.from(new Set(data?.map((product) => product.category_name))),
  ];

  // Function to filter products based on the selected category
  const filterProducts = (category) => {
    if (category === "All") {
      setProducts(data);
    } else {
      const filteredProducts = data?.filter(
        (product) => product.category_name === category
      );
      setProducts(filteredProducts);
    }
    setValue(category === "All" ? 0 : uniqueCategories.indexOf(category));
  };

  return (
    <div className="w-full border-gray-200 shadow-sm border-y">
      {isLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="max-w-screen-xl pb-[2rem] mx-auto text-gray-900 flex h-full">
          {/* Vertical tabs */}
          <div className="w-[20%] h-[70vh] max-h-[70vh] overflow-y-auto sticky bg-pink-50 flex flex-col items-start">
            {uniqueCategories.map((category, index) => (
              <div
                key={index}
                style={{
                  borderTop:
                    value === index ? "1px solid #9ca3af" : "1px solid #e5e7eb",
                }}
                className={`group w-full flex justify-between items-center ${
                  value === index
                    ? "bg-fuchsia-900 text-white"
                    : "text-gray-900"
                } px-3 py-2 text-xl`}
                onClick={() => filterProducts(category)}
              >
                {category}
                <BiChevronRight
                  className={`text-white w-8 h-8 ${
                    value === index ? "block" : "hidden"
                  }`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
          <div className="w-[80%] pl-5">
            {/* Tab panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-white">
              {products?.map((product, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col gap-5 items-center"
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
