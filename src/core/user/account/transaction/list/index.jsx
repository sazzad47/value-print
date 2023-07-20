import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useGetCategoriesQuery } from "../../../../state/api/product";
import Layout from "../../Layout";
import { Oval } from "react-loader-spinner";

const headers = ['Order ID', 'Amount', 'Status'];

const Transactions = () => {
  const { data, isLoading } = useGetCategoriesQuery({});
  console.log('data', data)

  return (
   <Layout>
       {isLoading? 
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
     </div> : <TableContainer className="bg-gray-100" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-fuchsia-900">
            <TableRow>
              <TableCell classN> Transaction ID </TableCell>
              {headers.map((header) => (
                <TableCell className="text-white" align="left">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      }
         
   </Layout>
  );
};

export default Transactions;
