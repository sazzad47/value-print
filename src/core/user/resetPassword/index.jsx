import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import authBg from "../../assets/auth-bg.jpg";
import { useResetPasswordMutation } from "../../state/api/user";
import { ColorRing } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { id, token } = useParams();

  const initState = {
    password: "",
    password2: "",
  };

  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState({});
  const [success, setSuccess] = useState(false);

  const { password, password2 } = userData;


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await resetPassword({ userData, id, token });
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("errors" in errorData) {
          setErrorMessage(errorData.errors);
        }
      }
    }
   
    if ("data" in response) {
      setSuccess(true);
    }
  };


  return (
    <div className="p-5 flex justify-center items-center w-full h-screen">
      <img src={authBg} alt="auth" className="absolute w-full h-full" />
      <div className="z-[3] bg-white w-full sm:w-[30rem] p-5 flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
        <Typography
            component="h1"
            variant="h5"
            className="text-gray-900 text-xl md:text-2xl font-bold mt-4"
          >
            Value Printing Pte Ltd
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            className="text-gray-900 text-md md:text-xl font-bold mt-4"
          >
            {success
              ? "Password Reset Successfully"
              : "Reset your password"}
          </Typography>
          
          {errorMessage.non_field_errors && (
            <Grid className="w-full p-4 mt-4 bg-stone-400 flex flex-col gap-3 rounded-md">
              <Grid className="flex items-center gap-2">
                <ErrorIcon />
                <Typography className="p-0 text-sm">
                  {errorMessage.non_field_errors}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid className="w-full p-4 mt-4 bg-stone-400 flex flex-col gap-3 rounded-md">
            <Grid className="flex items-center gap-2">
              <Typography className="p-0 text-sm text-white text-center">
                {success
                  ? "Your password has been reset successfully. You can now login with your new password."
                  : "Please create a new password for your account."}
              </Typography>
            </Grid>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 3 }}
            className="w-full"
          >
            {success ? null : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    inputProps={{
                      type: "password",
                      name: "password",
                      id: "password",
                      label: "New Password",
                      value: password,
                      onChange: handleChange,
                      setErrorMessage: setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    inputProps={{
                      type: "password",
                      name: "password2",
                      id: "password2",
                      label: "Confirm your password",
                      value: password2,
                      onChange: handleChange,
                      setErrorMessage: setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {success ? (
              <Link to="/login">
                <Button
                  className="normal-case text-slate-200 bg-fuchsia-900 hover:bg-fuchsia-800"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                className="normal-case text-slate-200 bg-fuchsia-900 hover:bg-fuchsia-800"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                {isLoading ? (
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
                  "Submit"
                )}
              </Button>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ inputProps }) => {
  const { type, name, id, label, value, onChange, setErrorMessage } =
    inputProps;

  const errorMessages = inputProps.errorMessages || {};

  return (
    <div>
      <TextField
        type={type}
        name={name}
        value={value}
        required
        fullWidth
        id={id}
        label={label}
        onChange={onChange}
        onFocus={() =>
          setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }))
        }
        sx={{
          label: {
            color: "#fda4af",
          },
          "& label.Mui-focused": {
            color: "#4a044e",
          },
          "& .MuiOutlinedInput-root": {
            color: "black",
            "& fieldset": {
              color: "black",
              borderColor: "#581c87",
            },
            "&:hover fieldset": {
              borderColor: "rgb(168 162 158)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4a044e",
            },
          },
        }}
      />
      {errorMessages[name] && errorMessages[name] !== "" && (
        <Grid className="flex items-center mt-2 gap-2 text-gray-900">
          <ErrorIcon />
          <Typography className="p-0 text-sm">{errorMessages[name]}</Typography>
        </Grid>
      )}
    </div>
  );
};
