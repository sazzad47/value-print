import React from 'react'

const BusinessCardStan = () => {
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
            rowSpan={2}
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
           Normal Order (No Finishing)
          </td>
          <td className="text-center" style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
          Same Day Ship Out
          </td>
          <td className="text-center"
            style={{ border: "1px solid #d6d3d1", padding: "8px" }}
            rowSpan={2}
          >
            1pm
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
           Custom Die-Cut
          </td>
          <td className="text-center" style={{ border: "1px solid #d6d3d1", padding: "8px" }}>
            + 1 day
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
  )
}

export default BusinessCardStan