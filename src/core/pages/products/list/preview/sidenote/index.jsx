import { Typography } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";
import { AiOutlineSketch, AiOutlineCloudUpload } from "react-icons/ai";
import ChangeService from "./ChangeService";

const SideNote = ({ featuresState }) => {
  const location = useLocation();
  const { pathname } = location;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("service");

  // Helper function to replace underscores with spaces and capitalize words
const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

  return (
    <>
      <div
        style={{ backgroundColor: "white" }}
        className="absolute top-0 w-full h-auto rounded-lg"
      >
        <div className="w-full max-w-md p-4 shadow">
          <div className="flex flex-col gap-3 mb-4">
            <div className="text-gray-900 text-lg font-bold leading-none flex items-center gap-3">
              {query === "upload_design" ? (
                <>
                  <AiOutlineCloudUpload />
                  Upload your design
                </>
              ) : (
                <>
                  <AiOutlineSketch />
                  Let us design
                </>
              )}
            </div>
            <ChangeService pathname={pathname} />
          </div>
          <div className="flow-root">
            <div className="w-full flex flex-col gap-3">
              {Object.entries(featuresState).map(([key, value]) => {
                if (key !== "photo" && key !== "artwork") {
                  return (
                    <div
                      key={key}
                      style={{
                        borderLeft: `2px solid #701a75`,
                        backgroundColor: "#fdf2f8",
                      }}
                      className="flex justify-between gap-5 items-center p-3 w-full"
                    >
                      <Typography className="text-gray-900 text-xs">
                      {formatKey(key)}
                      </Typography>
                      <Typography className="text-gray-900 text-xs">
                        {value}
                      </Typography>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNote;
