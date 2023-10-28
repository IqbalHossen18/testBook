import React, { useRef, useState } from 'react'
import { Addnote } from './Addnote'
import { Noteitem } from './Noteitem'
import { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/NoteContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export const Notes = (props) => {
  const context = useContext(noteContext)
  const { notes, allnotes, editnote , showalert} = context;
  let history = useHistory()
  const ref = useRef(null)
  const refclose = useRef(null)

   const [note, setnote] = useState({id:'', etitle:'', edescription:'', etag:''})

  useEffect(() => {
   if(localStorage.getItem('token')){
    allnotes()
   }
   else{
    history.push('/login')
   }
  }, [])
  const updatenote = (currentnote)=>{
       ref.current.click()
       setnote({id:currentnote._id, etitle:currentnote.title, edescription: currentnote.description, etag:currentnote.tag})
   
  }
  const handleclick=()=>{
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click()
    showalert('success' , "Note updated successfully")
  }
  const onchange=(e)=>{
    setnote({...note, [e.target.name] : e.target.value})
  }
  return (
    <>
      <Addnote />
      <div className="container">
   
        <button ref={ref} style={{display:'none'}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content p-3">
            <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="etitle">Title</label>
                        <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onchange} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="edescription">Description</label>
                        <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} ></textarea>
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="etag">Tag</label>
                        <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} aria-describedby="emailHelp" />
                    </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button  onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className='mt-2'>Your Totall Notes : {notes.length < 1 ? 'write a note first' : notes.length} </h2>
        {notes.length < 1 && 'You have no notes to show'}
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} updatenote={updatenote} />
        })}
      </div>
    </>
  )
}

export default Notes;