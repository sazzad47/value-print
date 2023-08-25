import React from "react";

const BusinessCardLamin = () => {
  return (
    <div
      style={{ border: "1px solid #d6d3d1", padding: "10px" }}
      className="p-5 mt-5"
    >
      <p> Example </p>
      <table className="mt-2 overflow-x-auto" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              Product
            </th>
            <th
              style={{
                border: "1px solid #d6d3d1",
                width: "60%",
                padding: "8px",
              }}
            >
              Finishing
            </th>
            <th style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              Process Days
            </th>
            <th style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              Cut Off Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center"
              style={{ border: "1px solid #d6d3d1", padding: "8px" }}
              rowSpan={3}
            >
              Business Card
            </td>
            <td className="text-center"
              style={{
                border: "1px solid #d6d3d1",
                width: "60%",
                padding: "8px",
              }}
            >
              Gloss / Matt Lamination / Gloss Water Based Varnish or with Round
              Corner or with Hole Punching or with Creasing
            </td>
            <td className="text-center" style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              1 day
            </td>
            <td className="text-center"
              style={{ border: "1px solid #d6d3d1", padding: "8px" }}
              rowSpan={3}
            >
              6pm
            </td>
          </tr>
          <tr>
            <td className="text-center"
              style={{
                border: "1px solid #d6d3d1",
                width: "60%",
                padding: "8px",
              }}
            >
              Spot UV (Front / Both)
            </td>
            <td className="text-center" style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              + 1 day
            </td>
          </tr>
          <tr>
            <td className="text-center"
              style={{
                border: "1px solid #d6d3d1",
                width: "60%",
                padding: "8px",
              }}
            >
              Hot Stamping
            </td>
            <td className="text-center" style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
              + 1 day
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BusinessCardLamin;
