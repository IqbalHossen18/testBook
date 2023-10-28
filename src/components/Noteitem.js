import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext';

export const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deletenote} = context;
  const {note, updatenote} = props;
  return (
    <>
     <div className="card my-2" >
          <div className="card-body">
            <h4 className="card-title"> {note.title} <i onClick={()=>{deletenote(note._id)}} className="fa-solid fa-trash-can mx-5"></i><i onClick={()=>{updatenote(note)}} className="fa-solid fa-pen-to-square mx-3"></i>
            </h4>
            <p className="card-text">{note.description}</p>
            <h6 className='card-title'>{note.tag} </h6>
            <p className='card-text'>{note.date}</p>
          </div>
        </div>
    </>
  )
}

export default Noteitem;