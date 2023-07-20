import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  IconButton,
  Button,
  Dialog,
  Divider,
} from "@mui/material";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Info from "./info";
import Intro from "./info/Intro";
import { useUpdateProfileMutation, useGetProfileQuery } from "../../state/api/user";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../state";
import { ColorRing, Oval } from "react-loader-spinner";

const Profile = () => {

  const { access_token } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data, isLoading: isFetchingProfile } = useGetProfileQuery({
    access_token,
  });

  const profilePhotoInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<any | null>(null);
  const [userData, setUserData] = useState<UserData>(initState);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChooseProfilePhoto = () => {
    profilePhotoInput.current?.click();
  };

  const handleFile = (e) => {
    if (e.target.files) {
      let newPhoto = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(newPhoto);
      setUserData((prevData) => ({ ...prevData, avatar: newPhoto }));
      setPhotoURL(newPhotoURL);
      handleClickOpen();
    }
  };

  const updatePhoto = async () => {
    const response = await updateProfile({ userData, access_token });

    if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: "Image saved successfully",
        })
      );
      handleClose();
    }
  };

  useEffect(() => {
    if (data) {
      setPhotoURL(data.avatar);
    }
  }, [data]);

  return (
    <Grid
      container
      className="w-full min-h-screen flex flex-col bg-black-gradient-2"
    >
      {isFetchingProfile ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <Grid>
          <Grid
            item
            className="w-full flex flex-col items-center justify-center relative p-5"
          >
            <Grid className="relative w-[150px] h-[150px]">
              <Avatar
                onClick={handleChooseProfilePhoto}
                src={photoURL}
                className="w-full h-full cursor-pointer"
              />
              <input
                ref={profilePhotoInput}
                hidden
                type="file"
                accept="image/*"
                onChange={handleFile}
              />
              <IconButton
                onClick={handleChooseProfilePhoto}
                className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[40px] h-[40px] absolute left-[105px] bottom-[-1px] text-slate-200 z-[20]"
              >
                <CameraAltIcon />
              </IconButton>
            </Grid>
            <Dialog
              sx={{
                "& .MuiDialog-paper": {
                  backgroundColor: "#474849",
                  width: "30rem",
                  height: "27rem",
                  maxHeight: "30rem",
                  overflow: "hidden",
                  transition: "height width var(--speed) ease",
                },
              }}
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <Grid className="w-full h-full flex flex-col px-4">
                <Grid className="w-full h-[10%] flex items-center justify-center">
                  <Typography className="p-0 text-lg text-slate-200">
                    Preview
                  </Typography>
                </Grid>
                <Divider className="w-full" />
                <Grid className="w-full h-[70%] relative flex items-center justify-center">
                  <Avatar
                    src={photoURL}
                    alt=""
                    className="w-[12rem] h-[12rem]"
                  />
                </Grid>
                <Grid className="w-full h-[20%] flex items-center justify-end">
                  <Grid className="flex gap-5">
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                      onClick={() => {
                        handleClose();
                      }}
                      className="normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="normal-case text-slate-200 bg-stone-500 hover:bg-stone-600"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                      onClick={updatePhoto}
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
            </Dialog>
            <Grid className="w-full flex flex-col md:flex-row items-start md:items-center relative">
              <Intro />
            </Grid>
          </Grid>
          <Grid item className="w-full px-5">
            <Info />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Profile;
