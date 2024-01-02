import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeNote } from './store/slices/noteSlice'; 

const Notes = ({setIds, setEdit, setView}) => {
  const dispatch = useDispatch();  
  let data = useSelector((state) => {
    return state.notes;
  })
  data = data.slice().reverse() 

  const deleteHandle=(id)=>{
    let length=data.length;  
    if(window.confirm("Do you want to delete this Note?")){
      dispatch(removeNote(length-id-1));
      const storedData = JSON.parse(localStorage.getItem('myNotes')) || [];
      const updatedData = [...storedData.slice(0, length-id-1), ...storedData.slice(length-id)];
      localStorage.setItem('myNotes', JSON.stringify(updatedData));
    }
  } 

  const editHandle = ({id})=>{
    setIds(id); 
    setEdit(0);  
  }

  const getSnippet = (text, maxLength = 50) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
  <div className='relative'>
    {
      data.map(({title, text}, id)=>(
        <div key={title+id} className="bg-purple-100 p-4 rounded-lg shadow-lg mb-4 w-full flex md:justify-between flex-col md:flex-row">
          <div className=''>
            <h2 className="text-xl font-bold">{title}</h2>
            {
              text.length<=20? (<p>{text}</p>):(<p>{text.slice(0, 25) + '...'}</p>)
            }
          </div>
          <div className="flex md:flex-row items-center mt-2 md:mt-0">
            <div className="w-4 md:w-5  cursor-pointer me-3 mt-0.5" onClick={()=>{setIds(id); setView(0)}}><img src='view.png' alt='edit'></img></div>
            <div className="w-4 md:w-6 cursor-pointer me-3" onClick={()=>editHandle({id})}><img src='edit.png' alt='edit'></img></div>
            <div className="w-4 md:w-6 cursor-pointer" onClick={()=>deleteHandle(id)}><img src='delete.png' alt='delete'></img></div>
          </div>
        </div>
      ))
    } 
  </div>
  )
}

export default Notes