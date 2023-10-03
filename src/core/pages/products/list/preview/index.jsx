import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetProductQuery } from "../../../../state/api/product";
import { Oval } from "react-loader-spinner";
import Description from "./description";
import Features from "./features";
import SideNote from "./sidenote";
import Service from "./service";
import CoverPhotos from "./slider";

const Preview = () => {
  console.log('process.env.REACT_APP_CLOUD_API_KEY', process.env.REACT_APP_CLOUD_API_KEY)
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("service");

  const { data, isLoading: isGetProductLoading } = useGetProductQuery({ id });
  const [features, setFeatures] = React.useState([...(data?.features || [])]);
  const [variants, setVariants] = React.useState(data?.variants);
  const [subvariants, setSubvariants] = useState({});
  const [price, setPrice] = React.useState([...(data?.price || [])]);
  const [services, setServices] = React.useState([
    ...(data?.design_services || []),
  ]);
  const [featuresState, setFeaturesState] = useState({});

  useEffect(() => {
    if (data) {
      setFeatures([...data.features]);
      setPrice([...data.price]);
      setServices([...data.design_services]);
      setVariants(data.variants);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setFeaturesState((prevState) => ({
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
        <div className="w-full px-[1rem] md:px-[5rem] py-[2rem] md:py-[5rem]">
          <div className="w-full flex justify-between">
            <Header title={`${data.name}`} />
          </div>
          <div className="mt-[1rem] flex flex-col gap-5">
            <div className="w-full flex flex-col md:flex-row h-auto md:h-[25rem]">
              <div className="h-full w-full md:w-1/2 bg-red-200 order-2 md:order-1">
                <Description data={data} />
              </div>
              <div className="w-full md:w-1/2 h-full relative order-1 md:order-2 text-gray-900">
                {data?.cover_photo?.length > 0 ? (
                  <div className="pb-[3rem] md:pb-0 relative w-full h-full flex items-center justify-end">
                    <CoverPhotos coverPhotos={data.cover_photo} />
                  </div>
                ) : (
                  <div className="mb-[3rem] md:mb-0 relative w-full h-full flex items-center justify-center">
                    <img
                      src={data.cover}
                      alt="cover"
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                )}
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
                  price={price}
                  setPrice={setPrice}
                  features={features}
                  setFeatures={setFeatures}
                  subvariants={subvariants}
                  setSubvariants={setSubvariants}
                  featuresState={featuresState}
                  setFeaturesState={setFeaturesState}
                  variants={variants}
                  data={data.pricing}
                />
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
