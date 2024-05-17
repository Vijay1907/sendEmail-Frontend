import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({item}) => {
  return (
    <Link to={`/users/${item.categoryName}/${item._id}`}>
<div className={`w-[320px] px-4 my-4 mx-4 py-6 border-1 text-white shadow ${item.bcolor} rounded-lg  ${item.name !== "Total Clients" ?'cursor-pointer':'cursor-default'}`}>
   <div className='flex justify-between items-center'> 
  
        <h5 className="mb-0 text-2xl font-bold">{item.name}</h5>
   
    <p className="mb-0 font-bold text-2xl">{item.count}</p>
   </div>
    {/* <p className="font-bold text-2xl mb-0">₹ {item.price}</p> */}
   
</div>
</Link>
  )
}

export default Card
