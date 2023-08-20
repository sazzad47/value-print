import React from "react";
import { useGetProductQuery, useGetProductsQuery } from "../../state/api/product";
import { BiChevronRight } from "react-icons/bi";
import { Oval } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import Product from "./product";

const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { id } = useParams();

  const { data: product, isFetching: isGetProductLoading } = useGetProductQuery({ id });

  const productList = Array.from(new Set(data?.map(product => ({ id: product.id, name: product.name }))));

  return (
    <div className="w-full">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-screen-xl pb-[2rem] mx-auto text-gray-900 flex h-full">
          <VerticalTabs productList={productList} id={id} />

          <div className="w-[80%] pl-5">
            {isGetProductLoading ? (
              <LoadingSpinner />
            ) : (
              <ProductGrid product={product} />
            )}
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
  const { id } = useParams();

  return (
    <div className="w-[20%] overflow-y-auto sticky flex flex-col items-start">
      {productList.map((product, index) => (
        <Link key={index} to={`/products/${product.id}`} className="no-underline">
          <div
            style={{
              borderLeft: product.id.toString() === id.toString() ? "2px solid #701a75" : "2px solid #e5e7eb",
            }}
            className={`group w-full flex justify-between items-center text-xl px-3 py-2 ${
              product.id.toString() === id.toString() ? "text-[#701a75]" : "text-gray-800"
            } transition-colors hover:border-[#701a75]`}
          >
            {product.name}
            <BiChevronRight
              className={`text-white w-8 h-8 ${
                product.id.toString() === id.toString() ? "block" : "hidden"
              }`}
              aria-hidden="true"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

const ProductGrid = ({ product }) => (
  <div>
    <Product product={product} />
  </div>
);

export default ProductList;
