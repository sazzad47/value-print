import React from "react";

export default function Details() {
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
      <h2 className="text-center text-fuchsia-900"> <span className="text-green-600"> Process Day </span> Calculation </h2>
      <p className="text-center"> The example of process day calculation below is calculated with no pending issue. </p>
    </div>
  );
}
