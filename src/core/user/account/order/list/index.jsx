import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Layout from "../../Layout";
import { Oval } from "react-loader-spinner";
import { useGetOrdersQuery } from "../../../../state/api/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const headers = ["Order ID", "Total Price", "Order Details", "Status"];

const Orders = () => {
  const { access_token } = useSelector((state) => state.global);
  const { data, isLoading } = useGetOrdersQuery({ access_token });
  console.log("data", data);
  const getTotalPrice = (order) => {
    // Calculate total price for a single order
    return order.order_details.reduce(
      (total, item) => total + parseFloat(item.total_amount),
      0
    );
  };

  return (
    <Layout>
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
        <TableContainer className="bg-gray-100" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-fuchsia-900">
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} className="text-white" align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-gray-900">{order.id}</TableCell>
                  <TableCell className="text-gray-900">
                    {getTotalPrice(order)}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    <Link to={`/account/orders/${order.id}`}>Details</Link>
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {order.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
};

export default Orders;
