import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export const FirstPage = () => {
    let history = useHistory()
    const gotoabout = () => {
        history.push('/signup')
    }
    return (
        <>
            <div id='homepage' className="container">
                <div className="jumbotron">
                    <h1 className="display-4">iNotebook</h1>
                    <p className="lead">iNotebook streamlines note-taking with user-friendly features for easy organization and efficient content management.</p>
                    <hr className="my-1" />
                    <p>
                        iNotebook is a user-friendly note-taking app that simplifies note creation, editing, and organization. It offers features like categorizing with tags, easy editing, and focused deletion. The app's structured tabs/pages aid efficient content management and provide a clutter-free workspace.</p>
                    <button  onClick={gotoabout} className="btn btn-primary btn-lg mt-3 ">Learn More</button>
                </div>
                
               <div className="container d-flex justify-content-center">
               <div style={{fontSize:'10px'}} className='alignitem my-2'>Copyright <i class="fa-regular fa-copyright"></i> [IqbalHossen18][2023] - All rights reserved.</div>
               </div>
               <div className='d-flex justify-content-center mb-5 fixed-bottom'>
                <a href="https://github.com/IqbalHossen18/iNotebook-frontend"  target="blank" ><i className=" mx-3 fa-brands fa-github"></i></a>
                <a href="/" target="blank" ><i className=" mx-3 fa-brands fa-facebook"></i></a>
                <a href="https://getbootstrap.com/" target="blank" ><i className=" mx-3 fa-brands fa-bootstrap"></i></a>
                <a href="/" target="blank" ><i className=" mx-3 fa-brands fa-twitter"></i></a>
                </div>
            </div>
        </>
    )
}
