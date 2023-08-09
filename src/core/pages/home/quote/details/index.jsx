import React from "react";
import Wave from "../../../../components/wave";
import QuotationCover from "../../../../assets/quotation.jpg";
import RequestForm from "./Form";

const Details = () => {
  return (
    <div className="flex flex-col relative pb-[5rem]">
      <Wave />
      <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center text-gray-700">
        <div className="w-full">
          <h2 className="text-xl sm:text-4xl text-fuchsia-900 text-start">
            Request for Quotation
          </h2>
        </div>
        <div className="w-full">
          <img src={QuotationCover} alt="" className="w-full h-full sm:h-[500px]" />
        </div>
        <div className="w-full flex flex-col gap-3"> 
          <p className="text-start">
            {" "}
            Got a printing requirement that doesn’t fit our specifications? No
            problem! Just tell us what you need by filling the request form
            below and clicking the submit button. Our sales team will notify you
            by email when your quote is ready (normally within 1 working day).{" "}
          </p>
          <p className="text-start">
            Telling us your budget range for your project up front is crucial
            and here’s why … if we have a sense of your budget for the project,
            we’ll be better able to recommend solutions that are appropriate.
          </p>
          <p className="text-start">
            *Note: For different sizes, materials, printing side or finishing
            option, kindly request for another quotation.
          </p>
        </div>
        <RequestForm/>
      </div>
    </div>
  );
};

export default Details;
