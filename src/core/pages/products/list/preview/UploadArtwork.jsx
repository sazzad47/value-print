import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Typography, useTheme } from "@mui/material";
import Slide from "@mui/material/Slide";
import ImageUploader from "../../../../components/fileUploader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../state/api/cart";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadArtwork({ featuresState, setFeaturesState }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState({ artwork: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    dispatch(addItem(featuresState));
    navigate("/cart");
  };

  return (
    <div>
      <div
        onClick={handleClickOpen}
        style={{ backgroundColor: theme.palette.primary[700] }}
        className="rounded-md px-3 py-2 text-center cursor-pointer"
      >
        Upload Artwork Files
      </div>
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
        <div className="p-5 pb-0 flex justify-between">
          <Typography className="text-2xl text-gray-900">
            Upload Artwork Files
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
        <div className="bg-gray-200 w-full h-full flex flex-col items-center gap-5">
          <div className="rounded-md mt-5 p-5 bg-white w-[500px] max-w-full mx-auto">
            <ImageUploader
              featuresState={featuresState}
              setFeaturesState={setFeaturesState}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </div>
          <button
            className="mb-2 cursor-pointer inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </Dialog>
    </div>
  );
}
