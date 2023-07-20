import { Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  AiOutlineMacCommand,
  AiOutlineClose,
  AiOutlineTransaction,
} from "react-icons/ai";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { unSetUserToken } from "../../state";
import { removeToken } from "../../state/localStorage";
import { ThreeDots } from "react-loader-spinner";
import { useGetProfileQuery } from "../../state/api/user";

const Sidebar = ({ setOpenSidebar }) => {
  return (
    <div
      style={{ border: "1px solid #e4e4e7" }}
      className="z-[10] absolute overflow-hidden left-0 top-[17vh] w-[18rem] h-[64vh] bg-white text-gray-900"
    >
      <MainMenu setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

const MainMenu = ({ setOpenSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { access_token } = useSelector((state) => state.global);
  const { data, isLoading } = useGetProfileQuery({ access_token });

  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/");
  };

  const handleMenuClick = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="">
      <div className="w-[18rem] h-[10vh] px-2">
        <div className="w-full h-full flex items-center justify-between">
          <Typography className="p-0 text-lg">Dashboard</Typography>
          <IconButton
            onClick={() => setOpenSidebar(false)}
            className="focus:outline-none text-gray-900"
          >
            <AiOutlineClose />
          </IconButton>
        </div>
        <hr className="w-full bg-pink-50" />
      </div>
      <div className="h-[80vh] pt-5 flex flex-col overflow-y-auto">
        <div className="w-full flex flex-col items-center gap-5">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              height={isNonMobile ? 50 : 40}
              width={isNonMobile ? 80 : 70}
              className="mr-3"
              alt="Logo"
            />
          </Link>
          <div className="w-full flex flex-col items-center">
            {isLoading ? (
              <ThreeDots
                height="30"
                width="30"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">
                  {data.first_name} {data.last_name}
                </h3>
                <h3 className="text-md text-gray-900">{data.email}</h3>
              </>
            )}
          </div>
          <div className="w-full p-5 pt-0 flex flex-col gap-2 text-gray-900">
            {menus.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                onClick={handleMenuClick}
                className="no-underline"
              >
                <Button
                  className={`w-full flex gap-3 text-start justify-start items-center px-2 py-2 rounded-md ${
                    location.pathname === item.url
                      ? "bg-fuchsia-900 text-white"
                      : "text-gray-900 bg-gray-200"
                  }`}
                >
                  <div className="flex items-center text-sm capitalize gap-3">
                    {item.icon}
                    {item.title}
                  </div>
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              className="w-full flex gap-3 text-start justify-start items-center px-2 py-2 rounded-md text-gray-900 bg-gray-200"
            >
              <div className="flex items-center text-sm capitalize gap-3">
                <FiLogOut />
                Logout
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const menus = [
  {
    id: 1,
    title: "Orders",
    icon: <AiOutlineMacCommand />,
    url: "/account",
  },
  {
    id: 2,
    title: "Transactions",
    icon: <AiOutlineTransaction />,
    url: "/transactions",
  },
  {
    id: 3,
    title: "Settings",
    icon: <FiSettings />,
    url: "/settings",
  },
];

export default Sidebar;
