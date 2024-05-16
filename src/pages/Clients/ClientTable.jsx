import React from "react";
import ReactSwitch from "react-switch";
import { useState } from "react";
import { BACKEND_URL } from "../../services/service";
const uri = BACKEND_URL

const ClientTable = ({ clients }) => {
  return (
    <>
      <div className="overflow-x-auto shadow-xl mt-7 rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <caption className="p-5 text-2xl font-bold text-left text-gray-900 bg-white ">
            Our Clients
          </caption>
          <thead className="text-sm text-gray-500 uppercase">
            <tr className="bg-white border-b-[1px] ">
              <th scope="col" className="px-6 py-5">
                S No.
              </th>
              <th scope="col" className="px-6 py-5">
                Client Name
              </th>
              <th scope="col" className="px-6 py-5">
                Profile
              </th>
              <th scope="col" className="px-6 py-5">
                Company Name
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Service Type
              </th>
              <th scope="col" className="px-6 py-5">
                Phone
              </th>
              <th scope="col" className="px-6 py-5">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((item, index) => (
              <tr key={index} className={`border-b bg-white hover:bg-gray-50`}>
                <td className="px-6 py-2">{index + 1}</td>
                <td className="px-6 py-2">{item.clientName}</td>
                <td className="px-6 py-2">
                  <img
                    src={
                      item.profileImage
                        ? uri + "/" + item.profileImage
                        : "/images/userImage.png"
                    }
                    alt="User Image"
                    className="rounded-full h-8 w-8 object-cover"
                  />
                </td>
                <td className="px-6 py-2">{item.companyName}</td>
                <td className="px-6 py-2">{item.email}</td>
                <td className="px-6 py-2">{item.serviceType}</td>
                <td className="px-6 py-2">{item.phone}</td>
                <td className="px-6 py-2 max-w-[250px] break-words">
                  {item.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientTable;
