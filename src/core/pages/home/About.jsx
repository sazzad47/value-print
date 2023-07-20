import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white relative my-[3rem] flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          style={{ transform: "translateX(-50%)" }}
          className="absolute left-0 hidden h-full text-white  lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z"></path>
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="https://res.cloudinary.com/dhhn4nlmq/image/upload/v1689350748/12735776_5073120_hsperd.jpg"
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block py-px mb-4 text-2xl font-semibold tracking-wider text-fuchsia-900 uppercase rounded-full bg-teal-accent-400">
            Printing Services Singapore
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            One-Stop Destination For Quick Printing
            <span className="inline-block text-deep-purple-accent-400">
              is real
            </span>
          </h2>

          <div className="w-full h-full flex gap-4">
            <div className="min-h-full min-w-[5px] bg-red-500 flex flex-col">
              <div className="min-h-[33%] bg-pink-800 min-w-full"></div>
              <div className="min-h-[33%] bg-green-500 min-w-full"></div>
              <div className="min-h-[33%] bg-pink-800 min-w-full"></div>
            </div>
            <p className="pr-5 text-gray-700 text-xs">
              We provide Custom printing services of top-notch quality, we are
              here to make your brand bigger and remarkable. We always put our
              efforts to provide you high-quality products at very reasonable
              prices. Value Print is “service oriented“ Cheap printing services
              company Singapore that invents and integrates design services,
              products and solutions that empower our customer profitability. We
              offer Cheap Printing Services for best customer experience, which
              include educating our customers to utilize our services and
              products to increase their profitability, productivity and
              efficiency.
            </p>
          </div>
          <div className="flex items-center mt-5">
            <Link to="/#products">
            <button
              className="mb-2 cursor-pointer whitespace-nowrap inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Get started
            </button>
            </Link>
            <Link
              className="inline-block whitespace-nowrap no-underline rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:hover:bg-neutral-700 dark:hover:bg-opacity-40"
              to="/about"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
