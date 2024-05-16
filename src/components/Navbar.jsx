import React from 'react'
import { companyDetails, loggedIn } from '../constants/constants'
import { Link ,useLocation} from 'react-router-dom';


const Navbar = () => {
  const location = useLocation()

  const showTitle = () => {
    const title = location.pathname.substring(1);
    if (!title) {
      return "Dashboard";
    }
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
   
<nav className="bg-white border-gray-200 shadow-xl border-b-2">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<div className='flex'>
<a href="https://flowbite.com/" className="flex items-center mr-9">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap">{showTitle()}</span>
  </a>

  
<form>   
    <div className="font-medium flex">
        <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="default-search" className="block w-[320px] p-4  text-sm text-gray-900 focus:outline-none" placeholder="Type to search..." required/>
    </div>
</form>
</div>
 


  {loggedIn && (
    <div className="flex items-center md:order-2">
    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
      <span className="sr-only">Open user menu</span>
      <img className="w-8 h-8 rounded-full" src={companyDetails.logo.img} alt="user photo"/>
    </button>
</div>
  )}

  </div>
</nav>

  )
}

export default Navbar
