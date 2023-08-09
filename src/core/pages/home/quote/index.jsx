import React from "react";
import { Link } from "react-router-dom";
const Quotation = () => {
  return (
    <div className="w-full h-auto mt-[3rem] px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem] bg-white">
      <div className="w-full bg-pink-50 p-[2rem] sm:p-[5rem] rounded-lg">
        <div className="w-full flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-fuchsia-900 text-2xl sm:text-3xl">
              {" "}
              Need a quote?{" "}
            </h1>
            <h4 className="text-gray-500 text-xl">
              {" "}
              Click here to request to a custom quote from our team{" "}
            </h4>
          </div>
          <div>
            <Link to="/quotation/form">
              <button
                style={{ border: "1px solid #701a75" }}
                className="bg-transparent cursor-pointer hover:bg-blue text-md text-gray-600 font-semibold hover:text-pink-400 px-4 py-2 rounded"
              >
                Get Quotation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
