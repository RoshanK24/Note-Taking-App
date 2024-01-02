import React from 'react'
import { useSelector } from 'react-redux';

const FullView = ({ids, setView}) => {
  const data = useSelector((state) => {
    return state.notes;
  })
  const size = data.length;
  return (
    <div className='w-full py-2 px-1 bg-white rounded-lg'>
        <div className='w-full ms-6 mt-5 font-bold text-xl'>Note: {ids+1}</div>
        <div className="w-full flex-col flex m-5 ms-6 mt-3"> 
            <div className='flex w-full'>
              <div className="block text-md font-bold text-gray-700 mb-2">Title:</div>
              <div className='ms-1 w-[80%]'>{data[size-ids-1].title}</div>
            </div> 
            <div className='flex w-full'>
              <div className="block text-md font-bold text-gray-700 mb-2">Text:</div>
              <div className='ms-1 w-[75%] md:w-[80%] text-sm md:text-base me-2'>{data[size-ids-1].text}</div>
            </div> 
            <div onClick={()=>{setView(1)}} className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-1.5 mt-4 cursor-pointer w-24 flex justify-center'>Close</div>
        </div>
    </div>
  )
}

export default FullView;