import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import InputField from "../../../../../components/InputField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: "white",
    borderTop: "1px solid #e5e5e5",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    backgroundColor: "white",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "white" }} {...other}>
      <Typography className="text-xl text-gray-900">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Customize({ setPrice, data }) {
  const [newValue, setNewValue] = React.useState({
    quantity: null,
  });

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pricePerProduct =
      data.rp - (data.rp * data.dp * newValue.quantity) / 100;
    const valueToAdd = {
      quantity: newValue.quantity,
      price: pricePerProduct * newValue.quantity,
      is_best_seller: false,
    };

    setPrice((prevPrice) => [valueToAdd, ...prevPrice]);

    // Perform any additional logic or API calls with the updated features data

    // Reset the new value state
    setNewValue({ quantity: null });

    // Close the dialog
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{
          bgcolor: "#fdf2f8",
          border: `1px solid #fdf2f8`,
          "&:hover": {
            border: `1px solid #701a75`,
          },
          color: "black",
        }}
        className="mt-[30px]"
        onClick={handleClickOpen}
      >
        Customize Quantity
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Customize Quantity
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="w-[25rem] max-w-full flex flex-col justify-center items-center gap-5">
            {errorMessage.non_field_errors && (
              <Grid className="w-full p-4 mt-4 bg-zinc-500 flex flex-col gap-3">
                <Grid className="flex items-center gap-2">
                  <ErrorIcon />
                  <Typography className="p-0 text-sm">
                    {errorMessage.non_field_errors}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              mt="1rem"
              className="w-full"
            >
              <div>
                <div>
                  <label
                    htmlFor="Quantity"
                    className="block mb-3 text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </label>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: "quantity",
                      id: "quantity",
                      value: newValue.quantity,
                      onChange: handleChange,
                      setErrorMessage: setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </div>
                <Button
                  disabled={!newValue.quantity}
                  className="normal-case inline-block rounded bg-fuchsia-900 px-12 pt-4 pb-3.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] md:mr-2 md:mb-0"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Set
                </Button>
              </div>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ color: "black" }}
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
