import React from "react";
import { Badge } from "../../../../../components/badge";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Pay from "./Pay";
import Download from "./Download";

export interface OrderDetailsProps {
  data: Record<string, any>;
}

const Header: React.FC<OrderDetailsProps> = ({ data }) => {
  return (
    <div className="w-full p-5 mb-5 border border-gray-500 rounded-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Badge
          variant={
            data?.status === "Pending"
              ? "destructive"
              : data?.status === "Processing"
              ? "default"
              : data?.status === "Submitted"
              ? "outline"
              : data?.status === "Completed"
              ? "secondary"
              : data?.status === "Approved"
              ? "default"
              : "destructive"
          }
        >
          {data?.status}
        </Badge>

        {data?.status === "Pending" && (
          <Link to={`/it/profile/orders/edit/${data?.id}`}>
            <Button
              variant="contained"
              size="small"
              className="px-2 py-1 capitalize cursor-pointer bg-neutral-500 hover:bg-neutral-600"
            >
              Edit
            </Button>
          </Link>
        )}
        {((data?.status === "Submitted" || data?.status === "Completed") && data.design_file) && (
          <Download data={data} />
        )}
        {data?.status === "Approved" && <Pay data={data} />}
      </div>
      {(data?.total_price || data?.advance_percentage || data?.total_paid >0) && (
        <div className="flex justify-between items-center">
          <div> Total Price: ${data?.total_price} </div>
          <div>
            {data?.total_paid > 0
              ? `Total Paid:  $${data?.total_paid}`
              : `Pay:
              ${
                data?.advance_percentage
                  ? `${data?.advance_percentage}%`
                  : `$${data?.total_price}`
              }`}
          </div>
        </div>
      )}
      {data?.status === "Approved" && (
        <div className="flex justify-start items-center">
          <div className="bg-black-gradient p-2 text-sm">
            Pay{" "}
            <span className="font-bold text-green-600">
              ${data?.advance_price}
            </span>{" "}
            in advance as {data?.advance_percentage}% of total $
            {data?.total_price} to move the order into processing.
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
