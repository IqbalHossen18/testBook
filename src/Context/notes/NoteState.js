import React , {useState} from 'react'
import noteContext from './NoteContext'
export const NoteState = (props) => {
    
    const [alert, setalert] = useState(null)
    const showalert = (type, message)=>{
        setalert({
            type: type,
            msg: message
        })
        setTimeout(()=>{
            setalert(null)
        }, 3000)
    }

    const noteinitiat = [] 
    const [notes, setnotes] = useState(noteinitiat)
//fetch all notes from the server..
    const allnotes = async () =>{
        try {
            const response = await fetch('http://localhost:5000/api/notes/fetchallnotes',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json()
            // console.log(json)
            setnotes(json)
        } catch (error) {
            console.error(error)
        }
    }

//addnotes state..........!!..

    const addnote = async(title, description, tag) =>{
        try {
            const response = await fetch('http://localhost:5000/api/notes/addnote',{
                method:'POST', 
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            })
            const json = await response.json()
            setnotes(notes.concat(json))
        } catch (error) {
            console.log(error.message);
        }
    }

//delete note logic ,,,

    const deletenote = async(id)=>{
        try {
            const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const json = await response.json()
            // console.log(json)
            const afterdelete = notes.filter((note)=>{
                return note._id !== id;
            })
            setnotes(afterdelete)
            showalert('warning', 'Note deleted successfully')
        } catch (error) {
            console.log(error.message)
        }
    }
   
// function for updating an existing note...

    const editnote = async(id, title, description, tag)=>{
        try {
            const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({title, description, tag})
            })
            const json = await response.json()
            // console.log(json)
            //logic for usersite update...
            const updatednote = JSON.parse(JSON.stringify(notes));
            for(let index = 0 ; index < updatednote.length ; index ++){
                const element = updatednote[index];
                if(element._id === id){
                    updatednote[index].title = title
                    updatednote[index].description = description
                    updatednote[index].tag = tag
                  break;
                }
            }
            setnotes(updatednote)
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <>
            <noteContext.Provider value={{notes, allnotes, addnote, deletenote, editnote, showalert , alert}}>
                {props.children}
            </noteContext.Provider>
        </>
    )
}

export default NoteState;