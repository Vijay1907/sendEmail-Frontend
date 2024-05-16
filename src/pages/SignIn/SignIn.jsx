import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { adminLogin } from "../../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const eye = <FontAwesomeIcon icon={faEye} />;

const SignIn = () => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const signIn = async () => {
    const updatedErrors = {
      email: !form.email && "Email is required",
      password: !form.password && "Password is required",
    };

    // Check if email is present and if it matches the email pattern
    if (updatedErrors.email === "" || !/^\S+@\S+\.\S+$/.test(form.email)) {
      updatedErrors.email = "Invalid email address";
    }

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
    } else {
      setErrors({});
      try {
        let res = await adminLogin(form);
        toast.success(res?.data?.message);
        setForm({});
        localStorage.setItem("token", res?.data?.token);
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleFocus = (e) => {
    const { name, value } = e.target;
    setFocus({
      ...focus,
      [name]: true,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocus({
      ...focus,
      [name]: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  return (
    <div className="p-5 px-12 min-h-[100vh]">
      <div name="about" className="mx-2  mt-4 px-3">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="lg:mt-0 flex justify-center items-center md:justify-start lg:col-span-6 lg:flex mt-3">
            <img
              className="w-[90%] md:w-[60%] lg:w-auto"
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="mockup"
            />
          </div>

          <div className="place-self-center w-full lg:col-span-6 flex justify-center items-center">
            <form className="w-[80%]">
              <h1 className="text-center text-2xl text-gray-700 my-7 font-medium">
                Admin Login
              </h1>
              <div className={`relative mb-6`}>
                <label
                  className={`pointer-events-none top-1.5 left-3 max-w-[90%] leading-[1.2]`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`peer block min-h-[auto] w-full rounded border border-gray-300 py-2 px-3 outline-none transition-all duration-200 ease-linear peer-focus:text-maincolor1 focus:border-blue-500`}
                  name="email"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className={`relative mb-6`}>
                <label
                  className={`pointer-events-none max-w-[90%] leading-[1.2]`}
                >
                  Password
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  className={`peer block min-h-[auto] w-full rounded border border-gray-300 py-2 px-3 outline-none transition-all duration-200 ease-linear peer-focus:text-maincolor1 focus:border-blue-500`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <i
                  className="absolute right-4 top-8 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {eye}
                </i>{" "}
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* <div className="mb-6 flex justify-between">
                                        <div>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                            id="exampleCheck96"
                                            defaultChecked
                                        />
                                        <label htmlFor="exampleCheck96">Remember Me</label>
                                        </div>
                                        <p className='text-blue-500 '>Forgot Password</p>
                                    </div> */}
              <button
                type="button"
                className="mb-6 inline-block w-full rounded-md bg-blue-500 hover:bg-blue-800 px-6 py-3 text-sm font-medium text-white"
                onClick={signIn}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
