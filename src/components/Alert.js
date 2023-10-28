import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'

export const Alert = () => {
    const context = useContext(noteContext);
    const { alert, showalert } = context;

    const capital =(word)=>{
        const lower = word.toLowerCase()
        return lower.toUpperCase()
    }
    return (
        <>
            <div className='fixed-top' style={showalert ? {height:'0px'} : {height:'50px'}}>
                {alert && <div style={{marginBottom:'0px'}} className={`alert alert-${alert.type} bg-${alert.type} text-white fade show`} role="alert">
                    <strong>{capital(alert.type)}</strong> : {alert.msg}
                </div>}
            </div>
        </>
    )
}
