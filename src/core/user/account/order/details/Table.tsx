import { Button } from "@mui/material";
import React from "react";

interface TableRowProps {
  label: string;
  value: any;
}

const TableRow: React.FC<TableRowProps> = ({ label, value }) => {
  if (label === "design_file") {
    return null; 
  }

  if (value === null) {
    return null; 
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500 capitalize">
        {label}:
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {Array.isArray(value) ? (
          <ul>
            {value.map(
              (item: { url: string; description: string }, index: number) => (
                <React.Fragment key={index}>
                  <li>
                    <span className="font-semibold">URL: </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold">Description:</span>{" "}
                    {item.description}
                  </li>
                </React.Fragment>
              )
            )}
          </ul>
        ) : (
          <React.Fragment>
            {typeof value === "string" && value.startsWith("http") ? (
              <a href={value} target="_blank" rel="noopener noreferrer">
                <Button
                  size="small"
                  variant="outlined"
                  className="capitalize px-2 py-1"
                >
                  View
                </Button>
              </a>
            ) : (
              value
            )}
          </React.Fragment>
        )}
      </td>
    </tr>
  );
};

interface OrderDetailsTableProps {
  data: Record<string, any>;
}

const Table: React.FC<OrderDetailsTableProps> = ({ data }) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => value !== null && key !== "design_file"
    )
  );

  const rows = Object.entries(filteredData).map(([key, value]) => (
    <TableRow key={key} label={key.replace(/_/g, " ")} value={value} />
  ));

  return (
    <div className="overflow-x-auto max-w-full">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
