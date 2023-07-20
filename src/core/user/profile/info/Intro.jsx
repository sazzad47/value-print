import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";

import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "../../../state/api/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { handleNotification } from "../../../../state";
import { ColorRing } from "react-loader-spinner";


const GeneralInfo = () => {
  const { access_token } = useSelector((state) => state.global);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data } = useGetProfileQuery({ access_token });
  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState<boolean>(false);
  const initState = { first_name: "", last_name: "", intro: "" };
  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState<any>({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProfile({ userData, access_token });

    if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: "Data saved successfully",
        })
      );
      setInputForm(false);
    }
  };

  useEffect(() => {
    if (data) {
      setUserData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        intro: data.intro || "",
      });
    }
  }, [data]);

  return (
    <Grid className="w-full flex items-center justify-center">
      {!inputForm && (
        <Grid className="w-full mt-3 flex flex-col items-center justify-start gap-1">
          <Grid className="flex gap-2 items-center">
            <Typography className="p-0 text-2xl">
              {userData.first_name} {userData.last_name}
            </Typography>
            <Tooltip title="Honorary member">
              <WorkspacePremiumIcon className="text-lg" />
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => setInputForm(true)}
                disableRipple
                className="text-inherit flex justify-start p-0 focus:outline-none normal-case"
              >
                <EditIcon className="p-0" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Typography className="text-lg text-slate-500 dark:text-slate-300">
            {userData.intro}
          </Typography>
        </Grid>
      )}

      {inputForm && (
        <Form
          setInputForm={setInputForm}
          data={userData}
          setData={setUserData}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          isUpdatingProfile={isUpdatingProfile}
        />
      )}
    </Grid>
  );
};

const Form = ({
  setInputForm,
  data,
  setData,
  handleSubmit,
  errorMessage,
  setErrorMessage,
  isUpdatingProfile,
}) => {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full pt-5">
      <Grid className="w-full flex flex-col md:items-center gap-2">
        <InputField
          inputProps={{
            type: "text",
            name: "first_name",
            id: "first_name",
            label: "First Name",
            value: data.first_name,
            onChange: handleChange,
            setErrorMessage: setErrorMessage,
            errorMessages: errorMessage,
          }}
        />
        <InputField
          inputProps={{
            type: "text",
            name: "last_name",
            id: "last_name",
            label: "Last Name",
            value: data.last_name,
            onChange: handleChange,
            setErrorMessage: setErrorMessage,
            errorMessages: errorMessage,
          }}
        />
        <InputField
          inputProps={{
            type: "text",
            name: "intro",
            id: "intro",
            label: "Intro",
            value: data.intro,
            onChange: handleChange,
            setErrorMessage: setErrorMessage,
            errorMessages: errorMessage,
            multiline: true,
          }}
        />
        <Grid className="w-full md:w-[20rem] flex justify-end ">
          <Grid className="flex gap-5">
            <Button
              onClick={() => {
                setInputForm(false);
                setData("");
              }}
              className="w-[5rem] normal-case text-slate-200 bg-zinc-500 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!data}
              variant="contained"
              className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
            >
              {isUpdatingProfile ? (
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
                "Save"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const InputField = ({ inputProps }) => {
  const {
    type,
    name,
    id,
    label,
    value,
    onChange,
    setErrorMessage,
    multiline,
    minRows,
  } = inputProps;

  const errorMessages = inputProps.errorMessages || {};

  return (
    <div>
      <TextField
        multiline={multiline}
        minRows={minRows}
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
            color: "rgb(214 211 209)",
          },
          "& label.Mui-focused": {
            color: "rgb(214 211 209)",
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              color: "white",
              borderColor: "rgb(120 113 108)",
            },
            "&:hover fieldset": {
              borderColor: "rgb(168 162 158)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(214 211 209)",
            },
          },
        }}
        className="md:w-[20rem] rounded-md"
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

export default GeneralInfo;
