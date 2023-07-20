import {
  Grid,
  Typography,
  IconButton,
  Button,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitterSquare, FaYoutube } from 'react-icons/fa'
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from "../../../state/api/user";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../../state";
import { ColorRing } from "react-loader-spinner";

const SocialLinks = () => {
  return (
    <Grid className="w-full">    
        <SocialLinksInfo />
    </Grid>
  );
};

const SocialLinksInfo = () => {
  const { access_token } = useSelector((state) => state.global);
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const { data } = useGetProfileQuery({ access_token });
  const dispatch = useDispatch();
  const [inputForm, setInputForm] = useState(false);
  const [showData, setShowData] = useState(data);
  const [socialLinks, setSocialLinks] = useState([
    {username: '', domain: ''}
  ])
 
  
  const handleSubmit = async () => {
    const serializedSocialLinks = JSON.stringify(socialLinks);
    const response = await updateProfile({
      userData: { social_links: serializedSocialLinks },
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
    if (data?.social_links) {
      const socialLinksCopy = JSON.parse(JSON.stringify(data.social_links));
      setSocialLinks(socialLinksCopy);
    }
  }, [data]);

  return (
    <Grid>
      <Grid className="flex gap-3 items-center mb-2">
        <RssFeedIcon />
        <Typography className="p-0 font-bold">Social Links</Typography>
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
      {!showData?.social_links && (
        <Grid className="w-full md:w-[20rem] p-4 my-4 bg-zinc-500 flex flex-col gap-3 text-inherit">
          <Grid className="flex items-center gap-2">
            <ErrorIcon />
            <Typography className="p-0 text-sm">
              Please add your social links
            </Typography>
          </Grid>
        </Grid>
      )}
      {inputForm ? (
        <Form
          setInputForm={setInputForm}
          data={socialLinks}
          setData={setSocialLinks}
          handleSubmit={handleSubmit}
          isUpdatingProfile={isUpdatingProfile}
        />
      ) : (
        <Grid className="flex gap-3 items-center">
        {showData?.social_links &&
            showData.social_links.map((item, i)=> {
          let link = item.domain + item.username;
          let icons = [
            {id: 1, 
             domain: "https://www.facebook.com/",
             icon: <FaFacebookF className="text-lg"/>
            },
            {id: 2, 
             domain: "https://www.instagram.com/",
             icon: <FaInstagramSquare className="text-lg"/>
            },
            {id: 3, 
             domain: "https://www.linkedin.com/",
             icon: <FaLinkedinIn className="text-lg"/>
            },
            {id: 4, 
             domain: "https://twitter.com/",
             icon: <FaTwitterSquare className="text-lg"/>
            },
            {id: 5, 
             domain: "https://www.youtube.com/",
             icon: <FaYoutube className="text-lg"/>
            },
          ]
          return (
            <IconButton key={i} onClick={() => window.open(link, '_self')} className="focus:outline-none bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 w-[35px] h-[35px] text-slate-200 z-[20]">
             {icons.find(domainIcon => domainIcon.domain === item.domain)?.icon}
         </IconButton>
          )
        })}
     
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
  isUpdatingProfile
}) => {
 
  const handleChange = (event, index)=> {
    let newData = [...data];
    newData[index][event.target.name] = event.target.value;
    setData(newData)
  }
  
  const addMore = ()=> {
    let object = {
      username: '',
      domain: ''
    }
    setData([...data, object])
  }
  


  return (
    <Grid className="">
      <form>
       
        <Grid className="flex flex-col gap-5">
        {data?.map((item, index)=> (
               <Grid key={index} className="flex flex-col w-full gap-2">

               <FormControl>
                 <InputLabel id="demo-simple-select-label" sx={{  
                    color: "rgb(214 211 209)",
                     "&.Mui-focused": {
                       color: "rgb(214 211 209)",
                     },
                 
                 }} >Social Media</InputLabel>
                 <Select
                   autoFocus
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   name="domain"
                   value={item.domain}
                   onChange={(event)=> handleChange(event, index)}
                   
                   sx={{
                    color: "white",
                     label: {
                       color: "darkred",
                       "&.Mui-focused": {
                         color: "darkred",
                       },
                     },
                     '.MuiOutlinedInput-notchedOutline': {
                      color: "rgb(214 211 209)",
                       borderColor: "rgb(120 113 108)",
                     },
                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                       color:  "rgb(214 211 209)"
                      ,
                       borderColor:  "rgb(214 211 209)",
                     },
                     '&:hover .MuiOutlinedInput-notchedOutline': {
                      color:  "rgb(214 211 209)",
                       borderColor: "rgb(168 162 158)",
                     },
                     '.MuiSvgIcon-root ': {
                       fill:  "rgb(214 211 209)"
                      ,
                     },
                     
                   }}
                   inputProps={{
                    MenuProps: {
                        MenuListProps: {
                            sx: {
                                backgroundColor:  "rgb(63 63 70)",
                                color:  "white"
                               ,
                            }
                        }
                    }
                }}
                   label="Social media"
                   className="md:w-[20rem] rounded-md"
                 >
                   <MenuItem value="https://www.facebook.com/">Facebook</MenuItem>
                   <MenuItem value="https://www.instagram.com/">Instagram</MenuItem>
                   <MenuItem value="https://www.linkedin.com/">LinkedIn</MenuItem>
                   <MenuItem value="https://twitter.com/">Twitter</MenuItem>
                   <MenuItem value="https://www.youtube.com/">Youtube</MenuItem>
                 </Select>
               </FormControl>
               <TextField
                 multiline
                 onChange={(event)=> handleChange(event, index)}
                 name="username"
                 value={item.username}
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
                       borderColor: "rgb(214 211 209)"
                     },
                   },
                 }}
                 placeholder="Username"
                 className="md:w-[20rem] rounded-md"
               />
               </Grid>
              ))}
         
          <Button
            onClick={addMore}
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            className="w-[10rem] text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600 focus:outline-none normal-case"
          >
            
            Add another link
          </Button>

          <Grid className="w-full md:w-[20rem] flex justify-end ">
            <Grid className="flex gap-5">
              <Button
                onClick={() => {
                  setInputForm(false);
                  setData([
                    {username: '', domain: ''}
                  ]);
                }}
                className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit()}
                disabled={!data}
                variant="contained"
                className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800 "
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
export default SocialLinks;



