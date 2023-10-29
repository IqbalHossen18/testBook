import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Userinfo = () => {
    const history = useHistory()
    const context = useContext(noteContext)
    const {user , notes} = context;
    
     const allcapital = (word)=>{
       if(word){
        let lower = word.toLowerCase()
        return lower.toUpperCase()
       }
     }
     const capital =(word)=>{
        if(word){
            let lower = word.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1)
        }
     }


    const gotohome=()=>{
        history.push('/')
    }

    return (
        <>
            <div  className="container d-flex justify-content-center mt-5">
                <div id='userC' className="card" style={{ width: '25rem', height: '450px' }}>
                    <div className="card-body text-white">
                        <h2 style={{ textAlign: 'center' }}>Your Profile</h2>
                        <div className='mt-3' id='namebox'><strong>{allcapital(user.name)}</strong></div>
                        <h4 className='mt-5'><span id="spantag"> Name : </span> {capital(user.name)} </h4>
                        <p className='mt-3'><span id="spantag"> Email-Address : </span> {user.email} </p>
                        <p className='mt-3'><span id="spantag"> Signed Up : </span> {user.date} </p>
                        <p className='mt-3'><span id="spantag"> Totall Notes: </span> {notes.length} </p>
                        <button onClick={gotohome} type='submit' style={{ width: '100%', padding: '8px', position: 'relative', top: '25px' }} className='btn btn-primary' >Go To Home</button>
                    </div>
                </div>
            </div>
        </>
    )
}
