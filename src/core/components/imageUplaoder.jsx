import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ErrorIcon from "@mui/icons-material/Error";
import LinearProgress from "@mui/material/LinearProgress";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GrDocumentUpload } from "react-icons/gr";

const isImageType = (url) => {
  const imageExtensions = [".jpeg", ".jpg", ".png", ".gif", ".bmp"];
  const extension = url.substring(url.lastIndexOf("."));

  return imageExtensions.includes(extension.toLowerCase());
};

const ImageUploader = ({
  userData,
  setUserData,
  errorMessage,
  setErrorMessage,
  name,
  multiple,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    if (fileList) {
      const filesData = [];
      const maxFileSizeInBytes = 1.86 * 1024 * 1024 * 1024;

      for (const file of fileList) {
        if (file.size > maxFileSizeInBytes) {
          setErrorMessage((prevMsg) => ({
            ...prevMsg,
            [name]: "One or more files exceed the maximum limit of 1.86 GB.",
          }));
          return;
        }
        filesData.push({ file, name: file.name });
      }

      setUploading(true);
      const cloudinaryURL = await uploadToCloudinary(fileList, setProgress);
      setUserData((prevData) => ({
        ...prevData,
        [name]: multiple ? cloudinaryURL : cloudinaryURL[0],
      }));
      setErrorMessage((prevMsg) => ({ ...prevMsg, [name]: "" }));
      setUploading(false);
      setUploadedFiles(filesData);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;

    try {
      setUploading(true);
      const cloudinaryURL = await uploadToCloudinary(fileList, setProgress);
      setUserData((prevData) => ({
        ...prevData,
        [name]: multiple
          ? [...(prevData[name] || []), ...cloudinaryURL]
          : cloudinaryURL[0],
      }));
      setErrorMessage((prevMsg) => ({ ...prevMsg, [name]: "" }));
      setUploading(false);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      setUploading(false);
    }
  };

  const handleRemoveFile = (url) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: multiple
        ? prevData[name]?.filter((itemUrl) => itemUrl !== url)
        : "",
    }));
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <article
          aria-label="File Upload Modal"
          className="min-h-[30vh] w-full p-3 sm:p-5 flex flex-col items-center justify-center"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => event.preventDefault()}
          onDragEnter={(event) => event.preventDefault()}
        >
          <input
            id={`input-${name}`}
            type="file"
            multiple={multiple}
            accept=".pdf,.jpeg,.jpg,.png,.psd,.eps,.tiff,.ai,image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="min-h-[20vh] flex flex-col items-center justify-center gap-3">
            <div className="w-full flex items-center justify-center">
              <GrDocumentUpload className="text-gray-400 h-[50px] w-[50px]" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 text-center">
              Drag and drop {multiple ? "files" : "file"} here or click to
              upload
            </h3>
            <h3 className="text-md text-center text-gray-700">
              You can attach both single or multiple files here. Maximum file
              size: 1.86 GB
            </h3>
            <div className="bg-gray-100 py-5 px-10 rounded-lg text-center text-gray-700">
              <p className="text-gray-500"> Allowed Formats </p>
              <p> PDF, JPEG, PNG, PSD, EPS, TIFF, AI </p>
            </div>

            {uploading ? (
              <div className="w-full flex flex-col gap-3">
                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={progress}
                />
                <span className="text-gray-800"> {parseInt(progress)}% </span>
              </div>
            ) : (
              <Button
                startIcon={<BsFillPlusCircleFill />}
                id="button"
                variant="contained"
                className="mt-2 bg-fuchsia-900 text-white capitalize focus:shadow-outline focus:outline-none"
                onClick={() => {
                  const input = document.getElementById(`input-${name}`);
                  input.click();
                }}
              >
                Upload files
              </Button>
            )}
          </div>
          <div className="w-full grid gap-2 grid-cols-3 sm:grid-cols-5 mt-5">
            {multiple
              ? userData[name]?.map((url, index) => {
                  const uploadedFile = uploadedFiles[index];
                  return (
                    <div key={index} className="w-full h-[15vh] relative group">
                      {isImageType(url) ? (
                        <>
                          {" "}
                          <img
                            className="absolute w-full h-full"
                            src={url}
                            alt="uploaded"
                          />
                          <section className="hidden group-hover:flex backdrop-brightness-50 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                            <div className="flex justify-end text-white cursor-pointer text-lg">
                              <AiOutlineClose
                                onClick={() => handleRemoveFile(url)}
                              />
                            </div>
                          </section>{" "}
                        </>
                      ) : (
                        <div className="text-gray-600 w-full h-full text-center flex items-center justify-center">
                          {uploadedFile.name}
                        </div>
                      )}
                    </div>
                  );
                })
              : userData[name] !== "" && (
                  <div className="w-full h-[15vh] relative group">
                    {isImageType(userData[name]) ? (
                      <>
                        <img
                          className="absolute w-full h-full"
                          src={userData[name]}
                          alt="uploaded"
                        />
                        <section className="hidden group-hover:flex backdrop-brightness-50 flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                          <div className="flex justify-end text-white cursor-pointer text-lg">
                            <AiOutlineClose
                              onClick={() => handleRemoveFile(userData[name])}
                            />
                          </div>
                        </section>{" "}
                      </>
                    ) : (
                      <div className="text-gray-600">
                        {uploadedFiles[0]?.name}
                      </div>
                    )}
                  </div>
                )}
          </div>
        </article>
      </div>
      {errorMessage[name] && errorMessage[name] !== "" && (
        <div className="flex items-center mt-2 gap-2 text-gray-800">
          <ErrorIcon />
          <Typography className="p-0 text-sm">{errorMessage[name]}</Typography>
        </div>
      )}
    </>
  );
};

export default ImageUploader;
