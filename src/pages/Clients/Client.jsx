import React, { useState, useEffect } from "react";
import ClientTable from "./ClientTable";
import { toast } from "react-toastify";
import { addClient, retrieveClients } from "../../services/service";
import { useLoader } from "../../context/LoaderContext/LoaderContext";

const Client = () => {
  const { showLoader, hideLoader } = useLoader()
  const [toggleAddClient, setToggleAddClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientAdded, setClientAdded] = useState(true);

  const getClientsApi = async () => {
    try {
      showLoader()
      let res = await retrieveClients();
      if (res.status == 200) {
        setClients(res?.data?.clients);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }finally{
      hideLoader()
    }
  };

  useEffect(() => {
    getClientsApi();
  }, [clientAdded]);

  useEffect(() => {
    if (toggleAddClient) {
      document.body.style.overflow = "hidden";
      // window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <div className="p-5 px-12 bg-color1 min-h-[100vh]">
      <div className="flex justify-end">
        <button
          className="bg-blue-500 px-3 hover:bg-blue-800 rounded-lg text-white py-2"
          onClick={() => {
            setToggleAddClient(true);
          }}
        >
          Add Client
        </button>
      </div>
      <ClientTable clients={clients} />
      {toggleAddClient && (
        <AddClient
          clientAdded={clientAdded}
          setClientAdded={setClientAdded}
          setToggleAddClient={setToggleAddClient}
        />
      )}
    </div>
  );
};

export default Client;

export const AddClient = ({
  setToggleAddClient,
  clientAdded,
  setClientAdded,
}) => {
  const { showLoader, hideLoader } = useLoader()
  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    email: "",
    profileImage: null, // To store the profile image file
    serviceType: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    clientName: "",
    companyName: "",
    email: "",
    serviceType: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input type is file (for profile image), update the state differently
    if (name === "profile") {
      setFormData({
        ...formData,
        profileImage: files[0], // Assuming only one file can be uploaded
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    showLoader()
    e.preventDefault();

    const updatedErrors = {
      clientName: !formData.clientName && "Client Name is required",
      companyName: !formData.companyName && "Company Name is required",
      email: !formData.email && "Email is required",
      serviceType: !formData.serviceType && "Service Type is required",
      phone: !formData.phone && "Phone is required",
      address: !formData.address && "Address is required",
    };

    // Check if any field has an error
    const hasErrors = Object.values(updatedErrors).some((error) => !!error);

    if (hasErrors) {
      setErrors(updatedErrors);
    } else {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append("clientName", formData.clientName);
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("serviceType", formData.serviceType);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      // Check if a profile image is uploaded
      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      setErrors({});
      try {
        let res = await addClient(formDataToSend);
        setFormData({
          clientName: "",
          companyName: "",
          email: "",
          profileImage: null,
          serviceType: "",
          phone: "",
          address: "",
        });
        toast.success(res?.data?.message);
        setClientAdded(!clientAdded);
        setToggleAddClient(false);
      } catch (err) {
        console.log(err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="fixed w-[full] inset-0 bg-gray-700/80">
      <div className="bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[50%] rounded">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
          <h3 className="text-lg font-semibold text-gray-900">Add Client</h3>
          <button
            onClick={() => setToggleAddClient(false)}
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
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-90">
                Client Name
              </label>
              <input
                value={formData.clientName}
                onChange={handleChange}
                type="text"
                name="clientName"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Enter Client Name"
              />
              {errors.clientName && (
                <p className="text-red-500 text-sm">{errors.clientName}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-90">
                Company Name
              </label>
              <input
                value={formData.companyName}
                onChange={handleChange}
                type="text"
                name="companyName"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Enter Company Name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*" // Restrict to images only
                name="profile"
                onChange={handleChange}
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Profile"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                value={formData.email}
                type="text"
                onChange={handleChange}
                name="email"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Service Type
              </label>
              <input
                value={formData.serviceType}
                type="text"
                onChange={handleChange}
                name="serviceType"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Enter Service Type"
              />
              {errors.serviceType && (
                <p className="text-red-500 text-sm">{errors.serviceType}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Phone
              </label>
              <input
                value={formData.phone}
                type="number"
                onChange={handleChange}
                name="phone"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
                placeholder="Enter Phone No."
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Address
              </label>
              <input
                value={formData.address}
                type="text"
                onChange={handleChange}
                name="address"
                className="bg-gray-100 border-0 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border focus:border-gray-300 focus:outline-none foucs:bg-white "
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
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};
