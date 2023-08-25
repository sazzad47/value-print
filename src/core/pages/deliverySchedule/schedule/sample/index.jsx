import React from "react";
import BusinessCardStan from "./BusinessCardStan";
import BusinessCardLamin from "./BusinessCardLamin";
import { useState } from "react";

export default function Details() {
  const [activeTab, setActiveTab] = useState("standard");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTabContent = () => {
    if (activeTab === "standard") {
      return <BusinessCardStan />;
    } else if (activeTab === "lamination") {
      return <BusinessCardLamin />;
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-center my-5">
        {" "}
        Our Process Days exclude the date of the order and the date of goods
        received, as well as Saturdays, Sundays, and Public Holidays. If you
        submit an order after the cut-off time, an extra working day will be
        required for processing. Any orders that are pending after the cut-off
        time will be considered as next day's order.{" "}
      </p>
      <h2 className="text-center text-fuchsia-900">
        {" "}
        <span className="text-green-600"> Process Day </span> Calculation{" "}
      </h2>
      <p className="text-center">
        {" "}
        The example of process day calculation below is calculated with no
        pending issue.{" "}
      </p>
      <div className="w-full flex justify-between gap-2 mt-2">
        <button
          style={{ border: "1px solid #075985" }}
          className={`${
            activeTab === "standard"
              ? "bg-[#075985] text-white"
              : "bg-white text-gray-800"
          } hover:bg-[#075985] w-full text-gray-800 hover:text-white px-3 py-3 cursor-pointer`}
          onClick={() => handleTabChange("standard")}
        >
          Standard Business Card
        </button>
        <button
          style={{ border: "1px solid #075985" }}
          className={`${
            activeTab === "lamination"
              ? "bg-[#075985] text-white"
              : "bg-white text-gray-800"
          } hover:bg-[#075985] w-full text-gray-800 hover:text-white px-3 py-3 cursor-pointer`}
          onClick={() => handleTabChange("lamination")}
        >
          Business Card with Lamination
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
}
