import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ImageUploader from "../../../../components/imageUplaoder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../state/api/cart";
import { useNavigate } from "react-router-dom";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadArtwork({
  featuresState,
  setFeaturesState,
  open,
  setOpen,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({ artwork: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    dispatch(addItem(featuresState));
    navigate("/cart");
  };

  const formatKey = (key) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#e5e7eb",
          },
        }}
      >
        <div className="p-5 pb-0 flex justify-between mb-[2rem]">
          <Typography className="text-3xl text-gray-900">
            Finalise Your Order
          </Typography>
          <IconButton
            edge="start"
            color="primary"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon className="text-gray-900" />
          </IconButton>
        </div>
        <div className="w-full flex flex-col gap-5 sm:w-[700px] mx-auto px-5">
          <div className="bg-gray-200 w-full h-full flex flex-col items-center gap-5">
            <h3 className="text-2xl text-gray-800 font-bold">
              {" "}
              Upload your artwork file{" "}
            </h3>
            <div className="upload-box rounded-md p-5 w-full mx-auto">
              <ImageUploader
                userData={featuresState}
                setUserData={setFeaturesState}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                name="artwork"
                multiple={true}
              />
            </div>
          </div>
          <div className="bg-gray-200 w-full h-full flex flex-col items-center gap-5">
            <h3 className="text-2xl text-gray-800 font-bold">
              {" "}
              Your Order Summary{" "}
            </h3>
            <div className="w-full flex flex-col gap-3">
              {Object.entries(featuresState).map(([key, value]) => {
                if (key !== "photo" && key !== "artwork") {
                  return (
                    <div
                      key={key}
                      style={{
                        borderLeft: `2px solid #701a75`,
                        backgroundColor: "white",
                      }}
                      className="flex justify-between gap-5 items-center p-3 w-full"
                    >
                      <Typography className="text-gray-900 text-xs">
                        {formatKey(key)}
                      </Typography>
                      <Typography className="text-gray-900 text-xs">
                        {value}
                      </Typography>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div className="w-full flex items-center justify-center mb-[5rem]">
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
      </Dialog>
    </div>
  );
}
