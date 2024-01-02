import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from './store/slices/noteSlice';

const Edit = ({ids, setEdit}) => {
    const dispatch = useDispatch(); 
    const data = useSelector((state) => {
        return state.notes;
    })
    const size = data.length;
    
    const [title, setTitle] = useState(data[size-ids-1].title);
    const [text, setText] = useState(data[size-ids-1].text) 

    const handleEdit = () => {
        dispatch(editNote({ index: size-ids-1, updatedNote: { title: title, text: text } }));
        setEdit(1);
        
        let storedData = JSON.parse(localStorage.getItem('myNotes')) || [];
        storedData[size-ids-1] = { title: title, text: text };
        localStorage.setItem('myNotes', JSON.stringify(storedData)); 
    }
    return (
        <div className='w-full py-2 px-1 bg-white rounded-lg'>
            <div className="w-full flex-col flex m-5">
                <label htmlFor="noteTitle" className="block text-md font-bold text-gray-700 mb-2">Title:</label>
                <input type='text' id="noteTitle" onChange={(e)=>{setTitle(e.target.value)}} value={title} className="md:w-11/12 w-[85%] border rounded-md p-2 mb-4 custom-placeholder" placeholder="Enter title" />

                <label htmlFor="noteContent" className="block text-md font-bold text-gray-700 mb-2">Text:</label>
                <input type='text' id="noteContent" onChange={(e)=>{setText(e.target.value)}} value={text} className="md:w-11/12 w-[85%] border rounded-md p-2 custom-placeholder" placeholder="Enter text" />
                <div className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-1.5 mt-4 cursor-pointer w-28 flex justify-center' onClick={handleEdit}>Edit Note</div>
            </div>
        </div>
  )
}

export default Edit