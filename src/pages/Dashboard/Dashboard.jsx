import React, { useEffect, useRef, useState } from "react";
import { addCategory, addUser, dashboardData, deleteCategory, sendEmail } from "../../services/service";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import Card from "./Card"
import { useLoader } from "../../context/LoaderContext/LoaderContext";


const Dashboard = () => {
  const { showLoader, hideLoader } = useLoader();
  const [toggleAddCategory, setToggleAddCategory] = useState(false);
  const [toggleDeleteCategory, setToggleDeleteCategory] = useState(false);
  const [cards, setCards] = useState([]);
  const [showingCard,setShowingCard]  = useState(null)
  const [clientsCount, setClientsCount] = useState(0);
  const [categoryAdded, setCategoryAdded] = useState(true);
  const [categoryDeleted, setCategoryDeleted] = useState(true);
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

  const handleSelectChange = (e) => {
    showLoader()
    const selectedId = e.target.value;
    const selectedOption = cards.find(option => option._id === selectedId);
    console.log("selectedOption",e.target.value)
    setShowingCard(selectedOption);
    hideLoader()
  };




  useEffect(() => {
    dashboardApi();
  }, [categoryAdded, categoryDeleted]);

  useEffect(() => {
    if (toggleAddCategory || toggleDeleteCategory) {
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
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Available Categories</h1>
        {/* Dropdown */}
        <select className="border p-2 rounded-lg w-[30%]" onChange={handleSelectChange}>
          {/* Rendering dropdown options */}
          <option value="">Select</option>
          {cards.map((option) => (
            <option key={option._id} value={option._id}>{option.categoryName}</option>
          ))}
        </select>
      </div>
     
      {showingCard ?
       <div className="flex items-center  justify-center mt-8 flex-wrap">
      <Card
      item={{
        ...showingCard,
        // bcolor: colors[index % colors.length],
        bcolor: "bg-green-500",
       
      }}
    /> <button className="bg-red-500 ml-7 text-white py-2 px-3 rounded text-lg cursor-pointer" onClick={(e)=>{
      setToggleDeleteCategory(true)
    }
    }>Delete</button>
     </div>
      :null
        }
        {/* <Card
          item={{
            name: "Total Clients",
            count: clientsCount,
            bcolor: "bg-green-500",
          }}
        /> */}
     


      {toggleAddCategory && (
        <AddCategory
          setToggleAddCategory={setToggleAddCategory}
          setCategoryAdded={setCategoryAdded}
          categoryAdded={categoryAdded}
        />
      )}
      {toggleDeleteCategory && (
        <DeleteCategory
        setShowingCard={setShowingCard}
          setToggleDeleteCategory={setToggleDeleteCategory}
          setCategoryDeleted={setCategoryDeleted}
          categoryDeleted={categoryDeleted}
          categoryId={showingCard?._id}
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
      }finally{
        hideLoader()
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
const DeleteCategory = ({ setShowingCard,categoryDeleted,setToggleDeleteCategory, setCategoryDeleted, categoryId }) => {
  const { showLoader, hideLoader } = useLoader();

  const handleDelete = async () => {
    showLoader();
    try {
      let res = await deleteCategory(categoryId);
      setToggleDeleteCategory(false);
      setCategoryDeleted(!categoryDeleted);
      setShowingCard(null)
      toast.success(res?.data?.message);
    } catch (err) {
      console.log("err occurred-----", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="fixed w-full h-full inset-0 bg-gray-700/80 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
       
          <>
            <p className="text-lg font-semibold text-gray-900 mb-4">Delete Category</p>
            <p>Are you sure you want to delete this category</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setToggleDeleteCategory(false)}
                className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg ml-2"
              >
                Cancel
              </button>
            </div>
          </>
    
      </div>
    </div>
  );
};


