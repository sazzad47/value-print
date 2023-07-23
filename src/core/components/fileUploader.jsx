import { Button, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { imageUpload } from "../../utils/imageUpload";
import { handleFileLoading } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const ImageUploader = ({
  setErrorMessage,
  errorMessage,
  featuresState,
  setFeaturesState,
}) => {
  const dispatch = useDispatch();
  const isUploadingFile = useSelector((state) => state.global.fileLoading);

  const handleFileChange = async (event) => {
    dispatch(handleFileLoading(true));
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      setFeaturesState((prevData) => ({
        ...prevData,
        artwork: cloudinaryURL[0],
      }));
      dispatch(handleFileLoading(false));
      console.log("featuresState", featuresState);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <article
          aria-label="File Upload Modal"
          className="min-h-[30vh] w-full p-3 sm-p-5 flex flex-col items-center justify-center"
        >
          <input
            id="hidden-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="min-h-[20vh] flex flex-col items-center justify-center gap-3">
            <h3 className="text-xl text-gray-900 font-bold">
              Uplaod your file here
            </h3>
            <div className="w-full flex justify-center my-5">
              <div className="w-[10rem] h-[15vh] relative group">
                <img
                  className="absolute w-full h-full"
                  src={featuresState.artwork}
                  alt="uploaded"
                />
                <section className="hidden group-hover:flex bg-black-100 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3"></section>
              </div>
            </div>

            <Button
              id="button"
              variant="contained"
              className="mt-2 w-1/2 bg-fuchsia-900 text-white capitalize focus:shadow-outline focus:outline-none"
              onClick={() => {
                const input = document.getElementById("hidden-input");
                input.click();
              }}
            >
              {isUploadingFile ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#b8c480",
                    "#B2A3B5",
                    "#F4442E",
                    "#51E5FF",
                    "#429EA6",
                  ]}
                />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </article>
      </div>
      {errorMessage.artwork && errorMessage.artwork !== "" && (
        <div className="flex items-center mt-2 gap-2 text-gray-900">
          <ErrorIcon />
          <Typography className="p-0 text-sm">
            {errorMessage.artwork}
          </Typography>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
