import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../../../../state/api/product";
import { Oval } from "react-loader-spinner";
import Description from "./description";
import Features from "./features";
import SideNote from "./sidenote";
import Service from "./service";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../../state/api/cart";

const Preview = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("service");
  const cartItems = useSelector((state) => state.cart.items);

  console.log("cartItems", cartItems);

  const { data, isLoading: isGetProductLoading } = useGetProductQuery({ id });
  const [features, setFeatures] = React.useState([...(data?.features || [])]);
  const [variants, setVariants] = React.useState(data?.variants);
  const [subvariants, setSubvariants] = useState({});
  const [price, setPrice] = React.useState([...(data?.price || [])]);
  const [services, setServices] = React.useState([
    ...(data?.design_services || []),
  ]);
  const [featuresState, setFeaturesState] = useState({});

  const handleAddToCart = () => {
    dispatch(addItem(featuresState));
    navigate("/cart");
  };

  console.log("data", data);

  useEffect(() => {
    if (data) {
      setFeatures([...data.features]);
      setPrice([...data.price]);
      setServices([...data.design_services]);
      setVariants(data.variants);
    }
  }, [data]);

  useEffect(() => {
    if (variants && variants.placeholder !== "") {
      setFeatures((prevFeatures) => [variants, ...prevFeatures]);
    }
  }, [variants]);

  useEffect(() => {
    if (data) {
      setFeaturesState(prevState => ({
        ...prevState,
        name: data.name,
        photo: data.photo,
      }));
    }
  }, [data]);
  
  return (
    <>
      {isGetProductLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <div className="px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem]">
          <div className="w-full flex justify-between">
            <Header title={`${data.name}`} />
          </div>
          <div className="mt-[1rem] flex flex-col gap-5">
            <div className="flex flex-col md:flex-row h-auto md:h-[25rem]">
              <div className="h-full w-full bg-red-200 order-2 md:order-1">
                <Description data={data} />
              </div>
              <div className="w-full h-full relative order-1 md:order-2 text-gray-900">
                <div className="mb-[3rem] md:mb-0 relative w-full h-full flex items-center justify-center">
                  <img
                    src={data.cover}
                    alt="cover"
                    className="object-contain w-auto h-auto max-w-full max-h-full"
                  />
                </div>
              </div>
            </div>
            <div className="relative h-auto flex w-full gap-5 mt-10">
              <div className="w-full md:w-[70%] h-auto flex flex-col gap-5">
                {query === "let_us_design" && (
                  <Service
                    data={data}
                    services={services}
                    setServices={setServices}
                  />
                )}
                <Features
                  data={data}
                  price={price}
                  setPrice={setPrice}
                  features={features}
                  setFeatures={setFeatures}
                  subvariants={subvariants}
                  setSubvariants={setSubvariants}
                  featuresState={featuresState}
                  setFeaturesState={setFeaturesState}
                />
                <div className="w-full flex justify-end">
                  <button
                    className="mb-2 cursor-pointer inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="hidden sticky min-w-[30%] min-h-[60vh] top-0 md:flex justify-center items-center">
                <SideNote features={features} featuresState={featuresState} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
