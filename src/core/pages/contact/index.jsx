import React from "react";
import Wave from "../../components/wave";
import { Typography } from "@mui/material";
import Form from "./Form";
import ContactInfo from "./ContactInfo";

const Contact = () => {
  return (
    <div className="flex flex-col relative pb-[5rem]">
      <Wave />
      <Typography className="absolute text-white text-xl md:text-4xl font-bold top-[2rem] md:top-[5rem] left-[1rem] md:left-[5rem]">
        {" "}
        Contact Us{" "}
      </Typography>
      <div className="w-full px-[1rem] md:px-[5rem] flex flex-col gap-5 items-center">
        <div className="w-full text-center text-gray-900 my-[3rem]">
          <Typography className="text-gray-900 font-bold text-xl md:text-4xl">
            Get in Touch
          </Typography>
          <Typography className="text-gray-900 mt-1 font-bold text-sm">
            Reach Out to Our Printing Experts
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full">
            {" "}
            <Form />
          </div>
          <div className="w-full">
            <ContactInfo />
          </div>
        </div>
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65352248.53894911!2d30.07571610000002!3d1.304219799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3d4ec5f16a61%3A0x7135de8aca097f2c!2sValue%20Printing%20Pte%20Ltd%20-%20Printing%20Service%20in%20Singapore!5e0!3m2!1sen!2sbd!4v1689617304557!5m2!1sen!2sbd"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
