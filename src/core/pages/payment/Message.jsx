import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="bg-primaryTheme h-screen p-5 flex items-center justify-center">
      <div className="bg-primary w-1/2 p-3 flex flex-col justify-center">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-secondaryTheme font-semibold text-center">
            Payment Successful!
          </h3>
          <p className="text-secondaryTheme my-2">
            Thank you for completing your payment.
          </p>

          <div className="py-10 text-center">
            <Link
              to="/it/profile"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
