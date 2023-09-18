import React from "react";
import { useParams } from "react-router-dom";
import { useSearchByCategoryQuery } from "../../state/api/product";
import { Oval } from "react-loader-spinner";
import { Typography } from "@mui/material";
import Product from "./Product";
import { useEffect } from "react";

const Category = () => {
  const params = useParams();
  const { name } = params;
  const { data, isLoading, refetch, isFetching } = useSearchByCategoryQuery({
    name,
  });

  useEffect(() => {
    refetch();
  }, [name, refetch]);
  return (
    <>
      {isLoading || isFetching ? (
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
        <div className="w-full flex flex-col gap-[3rem] pb-[5rem]">
          <div
            style={{ backgroundImage: `url(${data?.category?.cover})` }}
            className={`w-full h-[35vh] bg-cover bg-center`}
          >
            <div className="w-full h-full flex  justify-center items-center backdrop-blur-md">
              <span className="text-white text-2xl md:text-4xl w-1/2 text-center">
                {data.category.name} Printing Service
              </span>
            </div>
          </div>
          <div className="px-[1rem] md:px-[5rem] py-[3rem] bg-white">
            <div className="w-full text-center mb-[1rem] md:mb-[2rem]">
              <Typography className="text-2xl md:text-4xl font-bold text-fuchsia-900">
                {" "}
                Products{" "}
              </Typography>
            </div>
            {data.products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:grid-cols-5 ">
                {data.products.map((product, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col gap-5 items-center"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <Typography align="center" className="text-gray-900 text-lg">
                {" "}
                No product was uploaded yet in {data.category} category
              </Typography>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
