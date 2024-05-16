import React, { useState } from "react";
import { companyDetails, navLink } from "../constants/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  let loggedIn = false;
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log("check toke", token);
  if (token) {
    console.log("check tok222222e", token);
    loggedIn = true;
  }

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSideBar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="bg-blue-500 fixed left-0 w-14 min-h-[100vh] overflow-y-auto z-10">
      <div className="text-center">
        <button
          onClick={toggleSideBar}
          type="button"
          className="relative inline-flex items-center justify-center rounded-md bg-white p-2 my-5"
          coloraria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          <svg
            className="block h-6 w-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 z-9 w-64 h-screen transition-transform ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-gray-800">
          <a href="#" className="flex items-center pl-2.5 mb-5">
            <span className="self-center text-xl text-white font-semibold whitespace-nowrap ">
              {companyDetails.name}
            </span>
          </a>
          <button
            onClick={toggleSideBar}
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <ul className="space-y-2 font-medium text-white">
            {navLink?.map((item) => (
              <Link to={item.to} key={item.name} onClick={toggleSideBar}>
                <span
                  className={`flex items-center p-2 my-2  rounded-lg ${
                    location.pathname === item.to
                      ? "bg-blue-500 text-white"
                      : "hover:bg-white hover:text-gray-800"
                  } `}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </span>
              </Link>
            ))}
            {loggedIn ? (
              <Link onClick={handleSignOut}>
                <span
                  className={`flex items-center p-2 my-2  rounded-lg ${
                    location.pathname === "/signout"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-white hover:text-gray-800"
                  } `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3.5a.5 .5 0 0 0 -.5-.5h-8a.5 .5 0 0 0 -.5.5v9a.5 .5 0 0 0 .5.5h8a.5 .5 0 0 0 .5-.5v-2a.5 .5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5 .5 0 0 1 -1 0v-2z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M4.146 8.354a.5 .5 0 0 1 0-.708l3-3a.5 .5 0 1 1 .708.708L5.707 7.5H14.5a.5 .5 0 0 1 0 1H5.707l2.147 2.146a.5 .5 0 0 1 -.708.708l-3-3z"
                    ></path>
                  </svg>

                  <span className="ml-3">Sign Out</span>
                </span>
              </Link>
            ) : (
              <Link to="/signin" onClick={toggleSideBar}>
                <span
                  className={`flex items-center p-2 my-2  rounded-lg ${
                    location.pathname === "/signin"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-white hover:text-gray-800"
                  } `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-box-arrow-in-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3.5a.5 .5 0 0 1 .5-.5h8a.5 .5 0 0 1 .5.5v9a.5 .5 0 0 1 -.5.5h-8a.5 .5 0 0 1 -.5-.5v-2a.5 .5 0 0 0 -1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5 .5 0 0 0 1 0v-2z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M11.854 8.354a.5 .5 0 0 0 0-.708l-3-3a.5 .5 0 1 0 -.708 .708L10.293 7.5H1.5a.5 .5 0 0 0 0 1h8.793l-2.147 2.146a.5 .5 0 0 0 .708 .708l3-3z"
                    ></path>
                  </svg>

                  <span className="ml-3">Sign In</span>
                </span>
              </Link>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
