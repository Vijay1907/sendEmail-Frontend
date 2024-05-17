import React, { useEffect, useRef, useState } from "react";
import DashTable from "./UserTable";
import { addUser, dashboardData, retrieveUsers, sendEmail } from "../../services/service";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useParams } from 'react-router-dom';
import { useLoader } from "../../context/LoaderContext/LoaderContext";

const User = () => {
  
  const { showLoader, hideLoader } = useLoader()
  const { categoryId,categoryName } = useParams();
  const [toggleAddUser, setToggleAddUser] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [composeEmailOpen, setComposeEmailOpen] = useState(false);
  const [userAdded, setUserAdded] = useState(true);

  const getUserApi = async () => {
    try {
      showLoader()
      let res = await retrieveUsers(categoryId);
      if (res.status == 200) {
        setUsers(res?.data?.users);
        setUsersCount(res?.data?.usersCount);
        setClientsCount(res?.data?.clientsCount);
      }
    } catch (err) {
      const loggedIn = localStorage.getItem("token") !== null;
      if (loggedIn) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }finally{
      hideLoader()
    }
  };

  const handleExportToExcel = () => {
    showLoader()
    const data = users.map((user) => ({
      "S No.": users.indexOf(user) + 1,
      Name: user.name,
      "Nick Name": user.nickName,
      Category : categoryName,
      Email: user.email,
      Address: user.address,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
    hideLoader()
  };

  useEffect(() => {
    getUserApi();
  }, [userAdded]);

  useEffect(() => {
    if (toggleAddUser || composeEmailOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleAddUser, composeEmailOpen]);

  return (
    <div className="p-5 px-12 bg-color1 min-h-[100vh]">
      <div className="flex justify-end">
        <button
          className="bg-green-500 px-3 hover:bg-green-900 rounded-lg text-white py-2 mr-4"
          onClick={() => handleExportToExcel()}
        >
          Export Excel
        </button>
        <button
          className="bg-blue-500 px-3 hover:bg-blue-800 rounded-lg text-white py-2 mr-4"
          onClick={() => {
            setToggleAddUser(true);
          }}
        >
          Add User
        </button>
        {selectedRows.length > 0 && users.length > 0 ? (
          <button
            className="bg-yellow-500 px-3 hover:bg-yellow-600 rounded-lg text-white py-2"
            onClick={() => setComposeEmailOpen(true)}
          >
            Drop Mail
          </button>
        ) : (
          <button
            className="bg-yellow-500 px-3 rounded-lg text-white py-2 cursor-not-allowed opacity-50"
            disabled
          >
            Drop Mail
          </button>
        )}
      </div>
      <DashTable
      categoryName={categoryName}
        users={users}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      {toggleAddUser && (
        <AddUser
          setToggleAddUser={setToggleAddUser}
          setUserAdded={setUserAdded}
          userAdded={userAdded}
          categoryId={categoryId}
        />
      )}

      {composeEmailOpen && (
        <EmailComposePopup
          emails={selectedRows}
          onClose={() => setComposeEmailOpen(false)}
        />
      )}
    </div>
  );
};

export default User;

export const AddUser = ({ setToggleAddUser, setUserAdded, userAdded,categoryId }) => {
  
  const { showLoader, hideLoader } = useLoader()
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    nickName: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    showLoader()
    e.preventDefault();

    const updatedErrors = {
      name: !formData.name && "Name is required",
      nickName: !formData.nickName && "Nick Name is required",
      email: !formData.email && "Email is required",
      address: !formData.address && "Address is required",
    };

    // Check if email is present and if it matches the email pattern
    if (updatedErrors.email === "" || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      updatedErrors.email = "Invalid email address";
    }

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
    } else {
      setErrors({});
      try {
        let res = await addUser({...formData,categoryId});
        setToggleAddUser(false);
        setUserAdded(!userAdded);
        toast.success(res?.data?.message);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="fixed w-[full] inset-0 bg-gray-700/80">
      <div className="bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[50%] rounded">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
          <h3 className="text-lg font-semibold text-gray-900">Add User</h3>
          <button
            onClick={() => setToggleAddUser(false)}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 ">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 ml-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white"
                placeholder="Enter Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 ml-1"
              >
                Nick Name
              </label>
              <input
                type="text"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white"
                placeholder="Enter Nick Name"
              />
              {errors.nickName && (
                <p className="text-red-500 text-sm">{errors.nickName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 ml-1"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 ml-1"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white"
                placeholder="Enter Address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 px-3 hover:bg-green-800 rounded-lg text-white py-2"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

const EmailComposePopup = ({ onClose, emails }) => {
  const {showLoader,hideLoader} = useLoader()
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const popupRef = useRef(null);

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      showLoader()
      const formDataToSend = new FormData();

      // Append subject, message, and emails to FormData
      formDataToSend.append("subject", subject);
      formDataToSend.append("message", message);
      const emailsString = JSON.stringify(emails);
      formDataToSend.append("emails", emailsString);

      // Append all selected files under the key 'files'
      selectedFiles.forEach((file, index) => {
        formDataToSend.append("files", file);
      });

      const res = await sendEmail(formDataToSend);
      toast.success(res?.data?.message);
      setSubject("");
      setMessage("");
      setSelectedFiles([]);
      // Close popup
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }finally{
      hideLoader()
    }
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Function to remove a selected file
  const removeSelectedFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Function to render selected files
  const renderSelectedFiles = () => {
    return (
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-900">Selected Files:</p>
        <ul className="list-disc list-inside">
          {selectedFiles.map((file, index) => (
            <li
              key={index}
              className="text-sm text-gray-700 flex justify-between"
            >
              <span>{file.name}</span>
              <button
                className="text-red-500"
                onClick={() => removeSelectedFile(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render "Add Attachments" button
  const renderAddAttachmentsButton = () => (
    <div className="mt-2">
      <label
        htmlFor="attachments"
        className="block text-sm font-medium text-gray-900"
      >
        Add Attachments
      </label>
      <input
        type="file"
        id="attachments"
        className="mt-1"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Enable send button only when message field is filled
  const isSendButtonDisabled = message.trim() === "";

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg p-6 w-[500px] shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">Compose Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border border-gray-300 rounded-md w-full mt-1 p-2 focus:outline-none"
              placeholder="Enter Subject"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 rounded-md w-full mt-1 p-2 focus:outline-none h-32 resize-none"
              placeholder="Enter Message"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="attachments"
              className="block text-sm font-medium text-gray-900"
            >
              Attachments
            </label>
            {renderAddAttachmentsButton()}
            {selectedFiles.length > 0 && renderSelectedFiles()}
          </div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              isSendButtonDisabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSendButtonDisabled}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
