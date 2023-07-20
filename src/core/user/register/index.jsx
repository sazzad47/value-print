import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import authBg from "../../assets/auth-bg.jpg";
import { useRegisterUserMutation } from "../../state/api/user";
import { ColorRing } from "react-loader-spinner";

export default function SignUp() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { first_name, last_name, email, password, password2 } = userData;

  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(userData);
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("errors" in errorData) {
          setErrorMessage(errorData.errors);
        }
      }
    }
    if ("data" in response) {
      navigate("/activate-account");
    }
  };

  return (
    <div className="p-5 flex justify-center items-center w-full h-screen">
      <img src={authBg} alt="auth" className="absolute w-full h-full" />
      <div className="z-[3] bg-white w-full sm:w-[30rem] p-5 flex items-center justify-center">
        <div className="flex flex-col items-center">
         
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "first_name",
                    id: "first_name",
                    label: "First Name",
                    value: first_name,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "last_name",
                    id: "last_name",
                    label: "Last Name",
                    value: last_name,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  inputProps={{
                    type: "email",
                    name: "email",
                    id: "email",
                    label: "Email Address",
                    value: email,
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
                    name: "password",
                    id: "password",
                    label: "Password",
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
                    label: "Confirm Password",
                    value: password2,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  className="text-gray-900"
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                      sx={{
                        color: "#701a75",
                        "&.Mui-checked": {
                          color: "#701a75",
                        },
                      }}
                    />
                  }
                  label="I agree to the terms & conditions."
                />
              </Grid>
            </Grid>
            <Button
              className="normal-case text-slate-200 bg-fuchsia-900 hover:bg-fuchsia-800"
              type="submit"
              disabled={!checked}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className="no-underline text-gray-900">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
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
