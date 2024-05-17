import React, { useEffect, useState } from "react";
import { loggedInUser } from "../../constants/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  changeAdminPassword,
  getAdminProfile,
  updateaAdminProfile,
} from "../../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext/LoaderContext";
const eye = <FontAwesomeIcon icon={faEye} />;

const Profile = () => {
  const { showLoader, hideLoader } = useLoader()
  const navigate = useNavigate();
  const [view, setView] = useState(true);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [userErrors, setUserErrors] = useState({});

  //passwords
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordShown, setPasswordShown] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = (field) => {
    setPasswordShown({ ...passwordShown, [field]: !passwordShown[field] });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields({ ...passwordFields, [name]: value });
  };

  const updatePasswords = async () => {
    showLoader()
    const updatedErrors = {
      oldPassword: !passwordFields.oldPassword && "Old Password is required",
      newPassword: !passwordFields.newPassword && "New Password is required",
      confirmPassword:
        !passwordFields.confirmPassword && "Confirm Password is required",
    };

    if (
      passwordFields.oldPassword !== "" &&
      passwordFields.newPassword !== "" &&
      passwordFields.confirmPassword !== "" &&
      passwordFields.newPassword !== passwordFields.confirmPassword
    ) {
      console.log(1111);
      toast.error("New Password and Confirm Password must match");
      return;
    }

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
    } else {
      try {
        let res = await changeAdminPassword(passwordFields);
        setPasswordFields({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        toast.success(res?.data?.message);
        localStorage.clear();
        navigate("/signin");
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }finally{
        hideLoader()
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const clickedView = () => {
    setUserData({
      ...userData,
      password: "",
    });
    setView(true);
    setEdit(false);
  };
  const clickedEdit = () => {
    setEdit(true);
    setView(false);
  };

  const getAdminData = async () => {
    try {
      showLoader()
      let res = await getAdminProfile();
      setUserData(res?.data?.adminProfile);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }finally{
      hideLoader()
    }
  };

  const updatePrfoile = async () => {
    showLoader()
    const updatedErrors = {
      name: !userData.name && "Name is required",
      email: !userData.email && "Email is required",
    };

    // Check if email is present and if it matches the email pattern
    if (updatedErrors.email === "" || !/^\S+@\S+\.\S+$/.test(userData.email)) {
      updatedErrors.email = "Invalid email address";
    }

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setUserErrors(updatedErrors);
    } else {
      setUserErrors({});
      try {
        let res = await updateaAdminProfile(userData);
        toast.success(res?.data?.message);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }finally{
        hideLoader()
      }
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div className="p-5 px-12 bg-color1 min-h-[100vh]">
      <div className=" flex items-center pl-[150px]  bg-green-500 border-gray-200 mt-4">
        <p
          onClick={clickedView}
          className={`w-[80px] text-center ${
            view ? "bg-white" : "bg-[rgb(230,238,223)]"
          } py-3 px-4  ${
            view
              ? ""
              : "hover:bg-[rgb(38,86,52)] hover:text-white cursor-pointer"
          }`}
        >
          Profile
        </p>
        <p
          onClick={clickedEdit}
          className={`w-[160px] text-center ${
            edit ? "bg-white" : "bg-[rgb(230,238,223)]"
          } py-3 px-4  ${
            edit
              ? ""
              : "hover:bg-[rgb(38,86,52)] hover:text-white cursor-pointer"
          }`}
        >
          {" "}
          Change Password
        </p>
      </div>

      <div className="mt-9 bg-white grid max-w-screen-xl px-4 py-8 lg:py-16 lg:grid-cols-12 rounded">
        <div className="lg:col-span-6 flex justify-center">
          <img
            className="w-[300px] h-[300px] rounded-full"
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zNF9mdWxsX2JvZHlfM2RfYXZhdGFyXzNkX3JlbmRlcl9vZl9hX2J1c2luZXNzd19jOWYzODYxYy1lZTYzLTQxOGYtOThmNC02MWJkNGM3OGE1YTZfMS5wbmc.png"
            alt="Rounded avatar"
          />
        </div>

        {view ? (
          <div className="lg:col-span-6">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl text-gray-700 mb-2">Admin Profile</h1>
              <div>
                <div className="my-2">
                  <span
                    htmlFor="name"
                    className="block w-[70px] mb-2  text-sm font-medium text-gray-900"
                  >
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    className={`border border-gray-300 rounded-md w-[300px] py-[6px] px-2 focus:outline-none`}
                    value={userData?.name}
                    onChange={handleChange}
                  />
                  {userErrors?.name && (
                    <p className="text-red-500 text-sm mb-0">
                      {userErrors?.name}
                    </p>
                  )}
                </div>
                <div className="my-2">
                  <span
                    htmlFor="email"
                    className="block w-[70px] mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    className={`border border-gray-300 rounded-md w-[300px] py-[6px] px-2 focus:outline-none`}
                    value={userData?.email}
                    onChange={handleChange}
                  />
                  {userErrors?.email && (
                    <p className="text-red-500 text-sm mb-0">
                      {userErrors?.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-green-500 px-3 hover:bg-green-800 rounded-lg text-white py-2 mr-[14%] mt-4"
                onClick={updatePrfoile}
              >
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-6">
            <div className="flex flex-col justify-center">
              <div>
                <label
                  className="text-sm font-medium  text-gray-900"
                  htmlFor="oldPassword"
                >
                  Old Password
                </label>
                <div className="mt-1 mb-2 relative">
                  <input
                    id="oldPassword"
                    type={passwordShown.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={passwordFields.oldPassword}
                    onChange={handlePasswordChange}
                    className="border border-gray-300 rounded-md py-2 px-2 w-[80%] focus:outline-none"
                    placeholder="Enter Old password"
                  />
                  <i
                    className="absolute right-[22%] top-2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("oldPassword")}
                  >
                    {eye}
                  </i>
                </div>

                {errors.oldPassword && (
                  <p className="text-red-500 text-sm">{errors.oldPassword}</p>
                )}
                <label
                  className="text-sm font-medium  text-gray-900"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <div className="mt-1 mb-2 relative">
                  <input
                    id="newPassword"
                    type={passwordShown.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordFields.newPassword}
                    onChange={handlePasswordChange}
                    className="border border-gray-300 rounded-md py-2 px-2 w-[80%] focus:outline-none"
                    placeholder="Enter New password"
                  />
                  <i
                    className="absolute right-[22%] top-2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {eye}
                  </i>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
                <label
                  className="text-sm font-medium  text-gray-900"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="mt-1 mb-2 relative">
                  <input
                    id="confirmPassword"
                    type={passwordShown.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordFields.confirmPassword}
                    onChange={handlePasswordChange}
                    className="border border-gray-300 rounded-md py-2 px-2 w-[80%] focus:outline-none"
                    placeholder="Enter Confirm password"
                  />
                  <i
                    className="absolute right-[22%] top-2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {eye}
                  </i>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-green-500 px-3 mt-5 hover:bg-green-800 rounded-lg text-white py-2 mr-[14%]"
                onClick={updatePasswords}
              >
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
