import React from "react";
import "./styles.css";
import { motion } from "framer-motion";
import popularBadge from "../../../../../assets/star.svg";
import { AiOutlineFileImage } from "react-icons/ai";

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

export default function Dropdown({ item, featuresState, setFeaturesState }) {
  const [isMouse, toggleMouse] = React.useState(false);
  const toggleMouseMenu = () => {
    toggleMouse(!isMouse);
  };

  const defaultValue = item.value.find((val) => val.is_default);
  const defaultValueTitle = defaultValue
    ? defaultValue.title
    : item.value[0].title;

  const handleSelect = (placeholder, title) => {
    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [placeholder]: title,
    }));

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
          {featuresState[item.placeholder] || defaultValueTitle}
          <div
            className={`input-dropdown ${
              isMouse ? "active" : ""
            } text-lg text-white cursor-pointer items-center font-medium`}
            type="button"
          >
            <span className="arrow-input text-gray-700"></span>
          </div>
        </div>

        <motion.div
          className="sub-menu bg-white text-gray-900 shadow-[0px_2.0px_2.0px_rgba(0,0,0,0.38)]"
          initial="exit"
          animate={isMouse ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div className="sub-menu-background" />
          <div className="sub-menu-container">
            {item.value.map((option, index) => (
              <div
                onClick={() => handleSelect(item.placeholder, option.title)}
                key={index}
                style={{
                  borderBottom:
                    index === item.value.length - 1
                      ? "none"
                      : "1px solid #d1d5db",
                }}
                className={`sub-menu-item cursor-pointer text-gray-800  px-3 py-2 flex gap-5 ${
                  featuresState[item.placeholder] === option.title
                    ? "bg-pink-400 text-white"
                    : "hover:text-white hover:bg-pink-400"
                } `}
              >
                <div className="flex items-center justify-center">
                  {option.photo ? (
                    <img
                      src={option.photo}
                      alt="option"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <AiOutlineFileImage className="w-[40px] h-[40px]" />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <h4 className="font-bold text-md"> {option.title} </h4>
                  <p className="text-[0.6rem]"> {option.description} </p>
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
      </div>
  );
}
