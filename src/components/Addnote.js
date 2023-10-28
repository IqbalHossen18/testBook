import React, { useContext } from 'react'
import {useState } from 'react'
import noteContext from '../Context/notes/NoteContext'

export const Addnote = () => {
    const context = useContext(noteContext);
    const {addnote , showalert} = context;
    const [note, setnote] = useState({title:'', description: '', tag:''})

    const handleclick = (e)=>{
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        setnote({title:'', description: '', tag:''})
        showalert('success', "Note added successfully")
    }
    const onchange = (e) =>{
        setnote({...note, [e.target.name] : e.target.value})
    }
    return (
        <>
            <div className="container mt-5 ">
                <h2>testBook- Add note here</h2>
                <form>
                    <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onchange} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="description">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} ></textarea>
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight:'bold'}} htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} aria-describedby="emailHelp" />
                    </div>
                    <button onClick={handleclick} type="submit" className="btn btn-primary mt-2">Addnote</button>
                </form>
            </div>
        </>
    )
}

export default Addnote;