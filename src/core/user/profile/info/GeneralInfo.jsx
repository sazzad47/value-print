import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
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

const Intro = () => {
  return (
    <Grid className="w-full">
      <GeneralInfo />
    </Grid>
  );
};

const GeneralInfo = () => {
  const { access_token } = useSelector((state) => state.global);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data } = useGetProfileQuery({ access_token });
  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [showData, setShowData] = useState(data);
  const initState = {
    place_of_birth: "",
    current_location: "",
  };
  const [userData, setUserData] = useState(initState);

  const handleSubmit = async () => {
    const response = await updateProfile({
      userData,
      access_token,
    });

    if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: "Data saved successfully",
        })
      );
      setShowData(response.data)
      setInputForm(false);
    }
  };

  useEffect(() => {
    if (data) {
      setUserData((prevState) => ({
        ...prevState,
        place_of_birth: data.place_of_birth || "",
        current_location: data.current_location || "",
      }));
    }
  }, [data]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <PermIdentityIcon />
        <Typography className="p-0 font-bold">General information</Typography>
        {!inputForm && (
          <Tooltip title="Edit">
            <IconButton
              onClick={() => setInputForm(true)}
              disableRipple
              className="text-inherit flex justify-start p-0 focus:outline-none normal-case"
            >
              <EditIcon className="p-0 mr-2" />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
      {(!showData?.place_of_birth || !showData?.current_location) && (
        <Grid className="w-full md:w-[20rem] p-4 my-4 bg-zinc-500 flex flex-col gap-3 text-inherit">
          <Grid className="flex items-center gap-2">
            <ErrorIcon />
            <Typography className="p-0 text-sm">
              Please add your general information
            </Typography>
          </Grid>
        </Grid>
      )}
      {inputForm ? (
        <Form
          setInputForm={setInputForm}
          data={userData}
          setData={setUserData}
          handleSubmit={handleSubmit}
          isUpdatingProfile={isUpdatingProfile}
        />
      ) : (
        <Grid className="flex flex-col gap-2">
          <Grid className="w-full md:w-[20rem] flex flex-col gap-5">
            {showData?.place_of_birth && (
              <Grid className="w-full flex items-start">
                <Grid className="w-[40%]">
                  <Typography className="p-0">Hometown</Typography>
                </Grid>
                <Grid className="w-[60%] flex flex-col gap-2">
                  <Typography className="p-0 font-bold">
                    {showData?.place_of_birth}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {showData?.current_location && (
              <Grid className="w-full flex items-start">
                <Grid className="w-[40%]">
                  <Typography className="p-0">Current Location</Typography>
                </Grid>
                <Grid className="w-[60%] flex flex-col gap-2">
                  <Typography className="p-0 font-bold">
                    {showData?.current_location}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

const Form = ({
  setInputForm,
  data,
  setData,
  handleSubmit,
  isUpdatingProfile,
}) => {
  return (
    <Grid className="">
      <form>
        <Grid className="flex flex-col w-full gap-2">
          <CustomTextField
            inputProps={{
              autoFocus: true,
              multiline: true,
              type: "text",
              name: "place_of_birth",
              id: "place_of_birth",
              label: "Hometown",
              value: data.place_of_birth,
              onChange: (e) =>
                setData({ ...data, place_of_birth: e.target.value }),
            }}
          />
          <CustomTextField
            inputProps={{
              multiline: true,
              type: "text",
              name: "current_location",
              id: "current_location",
              label: "Current Location",
              value: data.current_location,
              onChange: (e) =>
                setData({ ...data, current_location: e.target.value }),
            }}
          />

          <Grid className="w-full md:w-[20rem] flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  setInputForm(false);
                  setData("");
                }}
                className="w-[5rem] normal-case text-slate-200 bg-zinc-500 hover:bg-zinc-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit()}
                disabled={!data}
                variant="contained"
                className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800"
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
    </Grid>
  );
};


const CustomTextField = ({ inputProps }) => {
  const {
    multiline,
    autoFocus,
    minRows,
    type,
    name,
    id,
    label,
    value,
    onChange,
  } = inputProps;

  return (
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
      autoFocus={autoFocus}
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
      className="w-full md:w-[20rem]"
    />
  );
};

export default Intro;
