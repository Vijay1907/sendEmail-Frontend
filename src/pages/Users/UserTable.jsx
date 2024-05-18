import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const DashTable = ({ categoryName,users, selectedRows, setSelectedRows }) => {
  const [editData, setEditData] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);

  useEffect(() => {
    if (toggleEdit || toggleDelete) {
      document.body.style.overflow = "hidden";
      // window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  // const handleRowSelect = (email) => {
  //   if (selectedRows.includes(email)) {
  //     setSelectedRows(selectedRows.filter((row) => row !== email));
  //   } else {
  //     setSelectedRows([...selectedRows, email]);
  //   }
  // };

  const handleRowSelect = (row) => {
    const rowIndex = selectedRows.findIndex(r => r.email === row.email);
    if (rowIndex !== -1) {
      setSelectedRows(selectedRows.map(r =>{r.email !== row.email } ));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };
  

  return (
    <>
      <div className="overflow-x-auto shadow-xl mt-10">
        <table className="w-full text-sm text-left text-gray-500 ">
          <caption className="p-5 text-2xl font-bold text-left text-gray-900 bg-white ">
            Users - {categoryName}
          </caption>
          <thead className="text-sm text-gray-500 uppercase">
            <tr className="bg-white border-b-[1px] ">
              <th scope="col" className="px-6 py-1">
                <input
                  type="checkbox"
                  checked={selectedRows.length === users?.length}
                  onChange={() => {
                    const allEmails = users?.map((item) => {
                          return {
                            email:item.email,
                            nickName:item.nickName
                          }
                    });
                    if (selectedRows.length === users?.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(allEmails);
                    }
                  }}
                />
              </th>

              <th scope="col" className="px-6 py-1">
                S No.
              </th>
              <th scope="col" className="px-6 py-1">
                Name
              </th>
              <th scope="col" className="px-6 py-1">
                Nick Name
              </th>
              <th scope="col" className="px-6 py-1">
                Email
              </th>
              <th scope="col" className="px-6 py-1">
                Phone No.
              </th>
              <th scope="col" className="px-6 py-1">
                Land Line No.
              </th>
              <th scope="col" className="px-6 py-1">
                Display Message
              </th>
              <th scope="col" className="px-6 py-1">
                Address
              </th>
              {/* <th scope="col" className="px-6 py-5">
                                Action
                            </th> */}
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr key={index} className={`border-b bg-white hover:bg-gray-50`}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.some(row => row.email === item.email)}
                    onChange={() => handleRowSelect({email:item.email,nickName:item.nickName})}
                  />
                </td>
                <td className="px-6 py-2">{index + 1}</td>
                <td className="px-6 py-2">{item.name}</td>
                <td className="px-6 py-2">{item.nickName}</td>
                
                <td className="px-6 py-2">{item.email}</td>
                <td className="px-6 py-2">{item.phone}</td>
                <td className="px-6 py-2">{item.landLine}</td>
                <td className="px-6 py-2">{item.displayMessage}</td>
                <td className="px-6 py-4 max-w-[250px] break-words">
                  {item.address}
                </td>
                {/* <td className="px-6 py-4">
                                    <div className='flex space-x-4 text-xl'>
                                        <FaEdit className='text-blue-500 cursor-pointer' onClick={()=>{
                                            setEditData(item)
                                            setToggleEdit(true)
                                            }} />
                                        <FaTrash className='text-red-500 cursor-pointer' onClick={()=>{
                                            setToggleDelete(true)
                                        }} />
                                        
                                    </div>
                                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toggleEdit && (
        <DashEditTable item={editData} setToggleEdit={setToggleEdit} />
      )}
      {toggleDelete && <DashDeleteTable setToggleDelete={setToggleDelete} />}
    </>
  );
};

export default DashTable;

export const DashEditTable = ({ item, setToggleEdit }) => {
  const [status, setStatus] = useState(item.status);
  return (
    <div className="fixed w-[full] inset-0 bg-gray-700/80">
      <form className="bg-white  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-[60%]">
        <h1 className="mb-8 text-xl font-medium text-gray-600">
          {" "}
          Lead Details
        </h1>
        <button
          onClick={() => {
            setToggleEdit(false);
          }}
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
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="floating_name"
              className="pl-1 block text-gray-700 text-sm font-bold mb-0"
            >
              Name
            </label>
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="pl-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              placeholder="Enter Name"
              disabled
              value={item.name}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="floating_email"
              className="pl-1 block text-gray-700 text-sm font-bold mb-0"
            >
              Email
            </label>
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="pl-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              placeholder="Enter Email"
              disabled
              value={item.email}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="floating_phone"
              className="pl-1 block text-gray-700 text-sm font-bold mb-0"
            >
              Phone No.
            </label>
            <input
              type="text"
              name="floating_phone"
              id="floating_phone"
              className="pl-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
              placeholder="Enter Phone No."
              disabled
              value={item.phone}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="floating_status"
              className="pl-1 block text-gray-700 text-sm font-bold mb-0"
            >
              Status
            </label>
            <div className="relative">
              <div className="w-40">
                <div className="relative">
                  <select
                    name="floating_status"
                    id="floating_status"
                    className="pl-1 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 14.293a1 1 0 001.414 0L14 10.414a1 1 0 00-1.414-1.414L10 11.586 6.414 8a1 1 0 10-1.414 1.414L10 14.414a1 1 0 00.293.293z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Update
        </button>
      </form>
    </div>
  );
};

export const DashDeleteTable = ({ setToggleDelete }) => {
  return (
    <div className="fixed w-[full] inset-0 bg-gray-700/80">
      <div className="relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow w-[40%]">
        <button
          onClick={() => {
            setToggleDelete(false);
          }}
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 ">
            Are you sure you want to delete this lead?
          </h3>
          <button
            onClick={() => {
              setToggleDelete(false);
            }}
            data-modal-hide="popup-modal"
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={() => {
              setToggleDelete(false);
            }}
            data-modal-hide="popup-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100   rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  "
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};
