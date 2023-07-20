import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Sidebar, { menus } from "./Sidebar";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { unSetUserToken } from "../../state";
import { removeToken } from "../../state/localStorage";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { useGetProfileQuery } from "../../state/api/user";
import { ThreeDots } from "react-loader-spinner";
import {BiMenu} from "react-icons/bi";

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    <div className={`bg-primaryTheme text-gray-900`}>
      <IconButton
        onClick={() => setOpenSidebar(!openSidebar)}
        className="hidden text-gray-900 text-3xl"
      >
        <BiMenu/>
      </IconButton>
      
      <CSSTransition
        classNames="user-dashboard-menu"
        in={openSidebar}
        timeout={500}
        unmountOnExit
      >
        <Sidebar setOpenSidebar={setOpenSidebar} />
      </CSSTransition>
      <div className="w-full gap-5 px-[1rem] md:px-[5rem] my-[2rem] md:my-[5rem] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-white h-[22rem]">
          <div className="h-auto pt-5 flex flex-col overflow-y-auto">
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
        <div className="w-full bg-white p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
