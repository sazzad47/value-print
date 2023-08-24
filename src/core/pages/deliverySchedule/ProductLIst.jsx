import React from "react";
import { useGetProductsQuery } from "../../state/api/product";
import { Oval } from "react-loader-spinner";
import Schedule from "./schedule";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery({});

  const productList = Array.from(
    new Set(data?.map((product) => ({ id: product.id, name: product.name })))
  );

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-screen-xl pb-[2rem] mx-auto text-gray-900 flex h-full">
          <VerticalTabs productList={productList} />

          <div className="w-full md:w-[80%] pl-0 md:pl-5">
           <Schedule/>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSpinner = () => (
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
);

const VerticalTabs = ({ productList }) => {
  return (
    <div className="w-[20%] hidden overflow-y-auto sticky sm:flex flex-col items-start">
      {productList.map((product, index) => (
        <div
          key={index}
          style={{
            borderLeft: "2px solid #e5e7eb",
          }}
          className={`group w-full flex justify-between items-center text-xl px-3 py-2 text-gray-800 transition-colors hover:border-[#701a75]`}
        >
          {product.name}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
