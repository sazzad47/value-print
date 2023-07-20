import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import SupportIcon from "@mui/icons-material/Support";
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "../../../state/api/user";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../../state";
import { ColorRing } from "react-loader-spinner";
import { RootState } from "../../../state/store";

const Biography = () => {
  return (
    <Grid className="w-full">
      <BiographyInfo />
    </Grid>
  );
};

const BiographyInfo = () => {
  const { access_token } = useSelector((state) => state.global);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data } = useGetProfileQuery({ access_token });
  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [showData, setShowData] = useState(data);
  const [biography, setBiography] = useState<string>("");

  const handleSubmit = async () => {
    const response = await updateProfile({
      userData: { biography },
      access_token,
    });

    if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: "Data saved successfully",
        })
      );
      setShowData(response.data);
      setInputForm(false);
    }
  };

  useEffect(() => {
    if (data?.biography) {
      setBiography(data.biography);
    }
  }, [data]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <SupportIcon />
        <Typography className="p-0 font-bold">Biography</Typography>
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
      {!showData?.biography && (
        <Grid className="w-full md:w-[20rem] p-4 my-4 bg-zinc-500 flex flex-col gap-3 text-inherit">
          <Grid className="flex items-center gap-2">
            <ErrorIcon />
            <Typography className="p-0 text-sm">
              Please add your biography
            </Typography>
          </Grid>
        </Grid>
      )}
      {inputForm ? (
        <Form
          setInputForm={setInputForm}
          data={biography}
          setData={setBiography}
          handleSubmit={handleSubmit}
          isUpdatingProfile={isUpdatingProfile}
        />
      ) : (
        <Typography className="p-0"> {showData?.biography} </Typography>
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
          <TextField
            multiline
            autoFocus
            onChange={(e) => setData(e.target.value)}
            value={data}
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
            className="md:w-[20rem] rounded-md bg-bgButton dark:bg-bgButtonDark text-textLight dark:text-textDark"
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
export default Biography;
