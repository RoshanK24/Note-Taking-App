import './App.css'
import { useEffect, useState } from 'react';
import Notes from './components/Notes';
import FullView from './components/FullView';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, removeAll } from './components/store/slices/noteSlice';
import Edit from './components/Edit';

function App() {
  const dispatch = useDispatch();

  const [add, setAdd] = useState(1);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const [edit, setEdit] = useState(1);
  const [ids, setIds] = useState(null); 
  const [view, setView] = useState(1);

  const handleCllick= () => {
    if(title!='' && text!=''){
      dispatch(addNote({title, text}));
      setTitle('');
      setText(''); 
      setAdd(1)
      const storedData = JSON.parse(localStorage.getItem('myNotes')) || [];
      const newItem = { title: title, text: text };
      storedData.push(newItem);
      localStorage.setItem('myNotes', JSON.stringify(storedData)); 
    }
  }

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('myNotes')) || [];
    dispatch(removeAll());
    storedData.map((value, id)=>{
      dispatch(addNote(value)); 
    })
  },[])

  return (
    <div className='relative h-screen w-full'>
      <img src="bg4.png" alt="Note Image" className="absolute h-[250px] md:h-[280px] inset-0 w-full object-cover opacity-90"/>
          {
            edit? (<></>
            ):(
              <div className='absolute z-20 scroll h-full flex justify-center items-center w-full bg-gray-500 bg-opacity-25 backdrop-blur-sm'>
                <div className='w-[80%] md:w-[38%]'>
                    <Edit ids={ids} setEdit = {setEdit}/>
                </div>
              </div>
            )
          } 
          {
            view? (<></>
            ):(
              <div className='absolute z-20 scroll h-full flex justify-center items-center w-full bg-gray-500 bg-opacity-25 backdrop-blur-sm'>
                <div className='w-[80%] md:w-[38%]'> 
                    <div><FullView ids={ids} setView={setView}/></div>  
                </div>
              </div>
            )
          }
      <div className='relative z-10 h-screen scroll'>
        <div className='flex items-center flex-col w-screen h-screen scroll'>
          <div className='w-[80%] md:w-6/12 text-3xl md:text-[2.6rem] mb-5 md:mb-8 mt-10 md:mt-20 font-bold'>Note Taking App</div>
          <div className='w-[80%] md:w-6/12 bg-white rounded-lg shadow-lg'>
            {
              add ? (
                <div className="w-full h-12 items-center flex mx-5 cursor-pointer" onClick={()=>{setAdd(!add)}}>Add New Note</div>
              ) : (
                <div className="w-full flex-col flex m-5">
                  <label htmlFor="noteTitle" className="block text-md font-bold text-gray-700 mb-2">Title:</label>
                  <input type='text' id="noteTitle" required={true} onChange={(e)=>{setTitle(e.target.value)}} value={title} className="md:w-11/12 w-[85%] border rounded-md p-2 mb-4 custom-placeholder" placeholder="Enter title" />

                  <label htmlFor="noteContent" className="block text-md font-bold text-gray-700 mb-2">Text:</label>
                  <input type='text' id="noteContent" required={true} onChange={(e)=>{setText(e.target.value)}} value={text} className="md:w-11/12 w-[85%] border rounded-md p-2 custom-placeholder" placeholder="Enter text" />
                  <div className='bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-1.5 mt-4 cursor-pointer w-36 flex justify-center' onClick={handleCllick}>Add New Note</div>
                </div>
              )
            }
          </div>
          <div className="w-[80%] md:w-6/12 mt-5 rounded-lg bg-white p-4 mb-8 shadow-xl" > 
            <div className='text-xl md:text-2xl font-bold mb-3 ms-1'>My Notes</div>
            <div className='min-h-36 max-h-96 overflow-y-auto scroll' >
              <Notes setIds = {setIds} setEdit = {setEdit} setView={setView}/>   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
