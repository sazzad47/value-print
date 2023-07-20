import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import authBg from "../../assets/auth-bg.jpg";
import { useActivateAccountMutation } from "../../state/api/user";
import { storeToken } from "../../state/localStorage";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserToken } from "../../state";

export default function ActivateAccount() {
  const [activateAccount, { isLoading }] = useActivateAccountMutation();

  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.global);

  const initState = {
    otp: undefined,
  };

  const [userData, setUserData] = useState(initState);
  const { otp } = userData;

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await activateAccount(userData);
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("message" in errorData) {
          setErrorMessage(errorData.message);
        }
      }
    }

    if ("data" in response) {
      dispatch(
        setUserToken({
          access_token: response.data.token.access,
        })
      );
      storeToken(response.data.token);
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
            {access_token
              ? "Account Activated Successfully"
              : "Verify Your Email"}
          </Typography>
          <Grid className="w-full p-4 mt-4 bg-stone-400 flex flex-col gap-3 rounded-md">
            <Grid className="flex items-center gap-2">
              <Typography className="p-0 text-sm text-white text-center">
                {access_token
                  ? "Welcome to our printing service! We're thrilled you've chosen us. Explore our products and make your printing projects come to life. Enjoy your experience with us!"
                  : "Please enter the 6-digit code we sent to your email address."}
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
            {access_token ? null : (
              <div>
                <InputField
                  inputProps={{
                    type: "otp",
                    name: "otp",
                    id: "otp",
                    label: "OTP",
                    value: otp,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                  }}
                />
                {errorMessage && (
                  <Grid className="flex items-center mt-2 gap-2 text-gray-900">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage}
                    </Typography>
                  </Grid>
                )}
              </div>
            )}
            {access_token ? (
              <Link to="/">
                <Button
                  className="normal-case text-slate-200 bg-fuchsia-900 hover:bg-fuchsia-800"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Go to Home
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
                  "Verify"
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

  return (
    <TextField
      type={type}
      name={name}
      value={value}
      required
      fullWidth
      id={id}
      label={label}
      onChange={onChange}
      onFocus={() => setErrorMessage("")}
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
  );
};
