import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import { routes } from "./constants/constants";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import Client from "./pages/Clients/Client";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/Users/User";
import Loader from "react-js-loader";
import { useLoader } from "./context/LoaderContext/LoaderContext";


const AllRoutes = () => {
  const location = useLocation();
  // const shouldShowNavbarAndFooter = location.pathname !== routes.signIn;
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("token") !== null;
  const { loading } = useLoader();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      {loggedIn && location.pathname !== routes.signIn && <Sidebar />}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-700">
          <Loader type="spinner-cub" bgColor={"rgb(0, 0, 0)"} color={"rgb(0, 0, 0)"} title={"Loading..."} size={100} />
        </div>
      )}
      <div className="ml-14">
     
        <ToastContainer
          position="top-center"
          autoClose={3500}
          // hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* {shouldShowNavbarAndFooter && <Navbar /> }     */}
        <Routes>
          <Route path={routes.home} element={<Dashboard />} />
          <Route path={routes.clients} element={<Client />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path={routes.users} element={<User />} />

          {/* Route for Not Found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default AllRoutes;
