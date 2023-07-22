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
import { useGetTransactionsQuery } from "../../../../state/api/user";
import { useSelector } from "react-redux";

const headers = ["Transaction ID", "Order ID", "Amount", "Status"];

const Transactions = () => {
  const { access_token } = useSelector((state) => state.global);
  const { data, isLoading } = useGetTransactionsQuery({ access_token });
  console.log("data", data);

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
                {headers.map((header) => (
                  <TableCell className="text-white" align="left">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="text-gray-900" align="left">
                    {row.id}
                  </TableCell>
                  <TableCell className="text-gray-900" align="left">
                    {row.order}
                  </TableCell>
                  <TableCell className="text-gray-900" align="left">
                    {row.amount}
                  </TableCell>
                  <TableCell className="text-gray-900" align="left">
                    {row.status}
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

export default Transactions;
