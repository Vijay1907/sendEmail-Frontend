import React from 'react'

const Card = ({item,index}) => {
  return (
   
<div className={`w-[320px] p-4 border-1 text-white shadow ${item.bcolor} rounded-lg`}>
   <div className='flex justify-between items-center'> 
   <a href="#" className='mb-0'>
        <h5 className="mb-0 text-2xl font-bold">{item.name}</h5>
    </a>
    <p className="mb-0 font-bold text-2xl">{item.count}</p>
   </div>
    {/* <p className="font-bold text-2xl mb-0">₹ {item.price}</p> */}
   
</div>

  )
}

export default Card
