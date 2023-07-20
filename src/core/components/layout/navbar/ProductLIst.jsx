import React, { useState } from "react";
import { useGetProductsQuery } from "../../../state/api/product";
import { BiChevronRight } from "react-icons/bi";
import { Typography } from "@mui/material";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ProductList = ({ setOpen }) => {
  const { data, isLoading } = useGetProductsQuery({});
  const [products, setProducts] = useState(data);
  const [value, setValue] = useState(0);
  const [photo, setPhoto] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

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
    setPhoto("");
    setOptions([]);
  };

  return (
    <div className="z-[5] w-full border-gray-200 shadow-sm border-y absolute top-[15vh]">
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
        <div className="max-w-screen-xl px-4 pt-[3rem] pb-[2rem] mx-auto text-gray-900 md:px-6 flex bg-gray-100 h-full">
          {/* Vertical tabs */}
          <div className="w-[20%] h-[70vh] max-[70vh] overflow-y-auto bg-white flex flex-col items-start">
            {uniqueCategories.map((category, index) => (
              <div
                key={index}
                style={{
                  borderTop:
                    value === index ? "1px solid #701a75" : "1px solid #fce7f3",
                }}
                className={`group w-full flex justify-between items-center ${
                  value === index
                    ? "bg-fuchsia-900 text-white"
                    : "text-gray-900"
                } px-3 py-2 text-xl`}
                onMouseEnter={() => filterProducts(category)}
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
          {/* Tab panel */}
          <div className="w-[45%] grid grid-cols-2 h-[3rem] gap-5 px-5">
            {/* Products */}
            {products.map((product) => (
              <li
                className="text-gray-900 text-sm h-[2rem]"
                key={product.id}
                onClick={() => {
                  navigate(`/products/list/${product.id}`);
                  setOpen(false);
                }}
                onMouseEnter={() => {
                  setPhoto(product.photo);
                  setOptions(product.options);
                }}
              >
                {product.name}
              </li>
            ))}
          </div>
          {/* Hovered product photo */}
          <div
            style={{ borderLeft: "1px solid #fecdd3" }}
            className="p-2 w-[35%] px-5"
          >
            <div className="w-full flex flex-col h-full">
              <div className="w-full h-1/2 relative">
                {photo !== "" && (
                  <img src={photo} alt="" className="w-full h-full absolute" />
                )}
              </div>
              <div className="w-full h-1/2 pt-[5rem] flex justify-center">
                {options.length > 0 && (
                  <div>
                    <Typography className="text-gray-900 font-bold text-2xl mb-5">
                      Available Options:
                    </Typography>
                    {options.map((item, index) => (
                      <li key={index}>{item.title}</li>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
