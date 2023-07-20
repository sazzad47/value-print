import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="w-full h-[5vh] flex items-center justify-center text-gray-200 bg-fuchsia-900">
      <div className="flex gap-4 items-center">
        <div className="hidden md:flex gap-2 items-center">
          <BiSolidPhoneCall/>
          +65 9012 1219
        </div>
        <div className="hidden md:flex gap-2 items-center">
          <AiOutlineMail/>
          sales@valueprint.com.sg
        </div>
        <div className="hidden md:flex gap-2 items-center">
          <MdLocationPin/>
          1 Brooke Road #01-01 Katong Plaza Singapore 429979
        </div>
        <div className="flex md:hidden items-center gap-2">
          Need help? <div className="flex items-center gap-1"> <BiSolidPhoneCall className="text-lg -mt-1"/> +65 9012 1219 </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
