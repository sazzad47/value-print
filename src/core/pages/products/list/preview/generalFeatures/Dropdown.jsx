import React from "react";
import "./styles.css";
import { motion } from "framer-motion";
import popularBadge from "../../../../../assets/star.svg";
import { AiOutlineFileImage } from "react-icons/ai";

const colors = [
  { name: "No Colour", code: "#FFFFFF" },
  { name: "BLK 01", code: "#000000" },
  { name: "BLU 01", code: "#2563eb" },
  { name: "BLU 02", code: "#1d4ed8" },
  { name: "BLU 03", code: "#1e40af" },
  { name: "BLU 04", code: "#1e3a8a" },
  { name: "BRW 01", code: "#92400e" },
  { name: "CYN 01", code: "#17a2b8" },
  { name: "GRN 04", code: "#008000" },
  { name: "GRN 05", code: "#006400" },
  { name: "MAG 01", code: "#ec4899" },
  { name: "MAR 01", code: "#800000" },
  { name: "ORG 01", code: "#FFA500" },
  { name: "RED 01", code: "#fca5a5" },
  { name: "RED 03", code: "#f87171" },
  { name: "VIO 01", code: "#EE82EE" },
];

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.1,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.1,
      delay: 0,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function Dropdown({
  colIdx,
  nextOptions,
  columnName,
  handleChange,
  handleTableChange,
  featuresState,
  setFeaturesState,
}) {
  const [isMouse, toggleMouse] = React.useState(false);
  const toggleMouseMenu = () => {
    toggleMouse(!isMouse);
  };

  return (
    <div className="menu-item" onClick={toggleMouseMenu}>
      <div
        style={{ border: "1px solid #e5e7eb" }}
        className={`flex min-w-full cursor-pointer ${
          isMouse
            ? "shadow-[0_0_10px_rgba(8,_112,_184,_0.7)]"
            : "hover:shadow-[0_0_10px_rgba(8,_112,_184,_0.7)]"
        } justify-between text-gray-600 -z-10 w-full text-sm bg-gray-100 px-3 py-2`}
      >
        {featuresState[columnName] || `Select ${columnName}`}
        <div
          className={`input-dropdown ${
            isMouse ? "active" : ""
          } text-lg text-white cursor-pointer items-center font-medium`}
          type="button"
        >
          <span className="arrow-input text-gray-700"></span>
        </div>
      </div>
      {columnName === "Front: K" ||
      columnName === "Front: M" ||
      columnName === "Back: K" ||
      columnName === "Back: M" ? (
        <motion.div
          className="sub-menu p-5 bg-white max-h-[15rem] z-10 overflow-y-auto text-gray-900 shadow-[0px_2.0px_2.0px_rgba(0,0,0,0.38)]"
          initial="exit"
          animate={isMouse ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <p className="text-center mb-5 md:mb-2">Please select colour</p>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
            {nextOptions[columnName] &&
              nextOptions[columnName].map((option, index) => (
                <div
                  onClick={() => {
                    console.log("index", option.value);
                    if (colIdx === 0) {
                      handleTableChange(option.value, columnName);
                    } else {
                      handleChange(option.value, columnName);
                    }
                  }}
                  key={index}
                  style={{
                    border: "1px solid transparent",
                  }}
                  className={`cursor-pointer text-gray-800  px-3 py-2 flex flex-col items-center gap-2 ${
                    featuresState[columnName] === option.value
                      ? "border-pink-400"
                      : "hover:border-pink-400"
                  } `}
                >
                  <div className="w-full text-center justify-center">
                    <h4 className="font-bold text-[0.7rem] p-0 m-0">
                      {" "}
                      {option.value}{" "}
                    </h4>
                  </div>
                  <div className="flex items-center justify-center">
                    {option.photo ? (
                      <img
                        src={option.photo}
                        alt="option"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div
                        style={{
                          background:
                            colors.find((color) =>
                              option.value.includes(color.name)
                            )?.code || "transparent",
                          border: option.value === "No Colour"? "1px solid #cbd5e1" : ""
                        }}
                        
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    )}
                  </div>

                  {option.is_popular && (
                    <div className="flex flex-col items-center">
                      {" "}
                      <img
                        src={popularBadge}
                        alt=""
                        width={15}
                        height={15}
                      />{" "}
                      <div className="text-green-500 font-bold text-[0.5rem] uppercase">
                        {" "}
                        popular
                      </div>{" "}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="sub-menu bg-white max-h-[15rem] z-10 overflow-y-auto text-gray-900 shadow-[0px_2.0px_2.0px_rgba(0,0,0,0.38)]"
          initial="exit"
          animate={isMouse ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="sub-menu-background" />
          <div className="sub-menu-container">
            {nextOptions[columnName] &&
              nextOptions[columnName].map((option, index) => (
                <div
                  onClick={() => {
                    console.log("index", colIdx);
                    if (colIdx === 0) {
                      handleTableChange(option.value, columnName);
                    } else {
                      handleChange(option.value, columnName);
                    }
                  }}
                  key={index}
                  style={{
                    borderBottom:
                      index === nextOptions[columnName].length - 1
                        ? "none"
                        : "1px solid #d1d5db",
                  }}
                  className={`sub-menu-item cursor-pointer text-gray-800  px-3 py-2 flex gap-5 ${
                    featuresState[columnName] === option.value
                      ? "bg-pink-400 text-white"
                      : "hover:text-white hover:bg-pink-400"
                  } `}
                >
                  <div className="flex items-center justify-center">
                    {option.photo ? (
                      <img
                        src={option.photo}
                        alt="option"
                        width={30}
                        height={30}
                      />
                    ) : (
                      <AiOutlineFileImage className="w-[30px] h-[30px]" />
                    )}
                  </div>
                  <div className="flex flex-col w-full justify-center">
                    <h4 className="font-bold text-xs"> {option.value} </h4>
                    <p className="text-[0.6rem]"> {option?.description} </p>
                  </div>
                  {option.is_popular && (
                    <div className="flex flex-col items-center">
                      {" "}
                      <img
                        src={popularBadge}
                        alt=""
                        width={15}
                        height={15}
                      />{" "}
                      <div className="text-green-500 font-bold text-[0.5rem] uppercase">
                        {" "}
                        popular
                      </div>{" "}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
