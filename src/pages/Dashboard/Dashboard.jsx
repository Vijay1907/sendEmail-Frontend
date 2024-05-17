import React, { useEffect, useRef, useState } from "react";
import { addCategory, addUser, dashboardData, sendEmail } from "../../services/service";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Card from "./Card"
import { useLoader } from "../../context/LoaderContext/LoaderContext";


const Dashboard = () => {
  const { showLoader, hideLoader } = useLoader();
  const [toggleAddCategory, setToggleAddCategory] = useState(false);
  const [cards, setCards] = useState([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [categoryAdded, setCategoryAdded] = useState(true);

  const dashboardApi = async () => {
    try { 
    showLoader()
      let res = await dashboardData();
      if (res.status == 200) {
        setCards(res?.data?.data);
        setClientsCount(res?.data?.clientsCount);
      }
    } catch (err) {
      console.log("err occured-----",err)
      const loggedIn = localStorage.getItem("token") !== null;
      if (loggedIn) {
        toast.error(err?.response?.data?.message || "Admin is not logged in");
      }
    } finally {
      hideLoader();
    }
  };


  useEffect(() => {
    dashboardApi();
  }, [categoryAdded]);

  useEffect(() => {
    if (toggleAddCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleAddCategory]);

  const colors = [
    "bg-red-500", "bg-yellow-500",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
    "bg-orange-500", "bg-gray-500", "bg-lime-500", "bg-cyan-500","bg-blue-500",
  ];

  return (
    <div className="p-5 px-12 bg-color1 min-h-[100vh]">
      <div className="flex justify-end">
     
        <button
          className="bg-blue-500 px-3 hover:bg-blue-800 rounded-lg text-white py-2 mr-4"
          onClick={() => {
            setToggleAddCategory(true);
          }}
        >
          Add Category
        </button>
  
      </div>
      <div className="flex mt-8 flex-wrap">
      {cards.map((card, index) => (
        <Card
          key={index}
          item={{
            ...card,
            bcolor: colors[index % colors.length],
          }}
        />
      ))}
        <Card
          item={{
            name: "Total Clients",
            count: clientsCount,
            bcolor: "bg-green-500",
          }}
        />
      </div>


      {toggleAddCategory && (
        <AddCategory
          setToggleAddCategory={setToggleAddCategory}
          setCategoryAdded={setCategoryAdded}
          categoryAdded={categoryAdded}
        />
      )}

    </div>
  );
};

export default Dashboard;

export const AddCategory = ({ setToggleAddCategory, setCategoryAdded, categoryAdded }) => {
  const { showLoader, hideLoader } = useLoader();
  const [formData, setFormData] = useState({
    categoryName: "",
  });

  const [errors, setErrors] = useState({
    categoryName: "",
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
      categoryName: !formData.categoryName && "Category Name is required",
    };

    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
    } else {
      setErrors({});
      try {
        let res = await addCategory(formData);
        setToggleAddCategory(false);
        setCategoryAdded(!categoryAdded);
        toast.success(res?.data?.message);
      } catch (err) {
        console.log("err occured-----",err)
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="fixed w-[full] inset-0 bg-gray-700/80">
      <div className="bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[40%] rounded">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
          <h3 className="text-lg font-semibold text-gray-900">Add Category</h3>
          <button
            onClick={() => setToggleAddCategory(false)}
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
                htmlFor="categoryName"
                className="block mb-2 text-sm font-medium text-gray-900 ml-1"
              >
                Category Name
              </label>
              <input
                type="text"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white"
                placeholder="Enter Category Name"
              />
              {errors.categoryName && (
                <p className="text-red-500 text-sm">{errors.categoryName}</p>
              )}
            </div>
         
          </div>
          <button
            type="submit"
            className="bg-green-600 px-3 hover:bg-green-800 rounded-lg text-white py-2"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

const EmailComposePopup = ({ onClose, emails }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const popupRef = useRef(null);

  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      console.log("err occured-----",err)
      toast.error(err?.response?.data?.message || "Something went wrong");
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
