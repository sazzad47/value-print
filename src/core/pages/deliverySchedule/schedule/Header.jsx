import React from "react";
import deliveryImage from "../../../assets/delivery-image.png";

const Header = () => {
  return (
    <div className="w-full flex flex-col gap-3 sm:flex-row bg-pink-100 p-3 sm:p-[2rem]">
      <div className="flex flex-col gap-2">

      <h1 className="text-fuchsia-900"> Fast Delivery with Product Process Day - <span className="text-green-600"> Schedule Now! </span> </h1>
      <p>
        Get your products processed and delivered faster with our efficient
        product process day! Place your order today to experience prompt order
        processing and delivery within the shortest possible time frame.
      </p>
      </div>
      <img src={deliveryImage} alt="delivery"  />
    </div>
  );
};

export default Header;
