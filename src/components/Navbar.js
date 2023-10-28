import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import noteContext from '../Context/notes/NoteContext';
export const Navbar = () => {
    const context = useContext(noteContext);
    const { showalert } = context;
    const history = useHistory();
    const location = useLocation()
    const handleLogout = () => {
        localStorage.removeItem('token')
        showalert('success', 'Logged Out Successfully')
        history.push('/login')
    }
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">testBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-info mx-1 " to="/login" role="button">Login</Link>
                            <Link className="btn btn-info mx-1 " to="/signup" role="button">Signup</Link>
                        </form> : <form><button onClick={handleLogout} className='btn btn-info mx-1 '>Logout</button>
                        <Link className="btn btn-info mx-1 " to="/user" role="button">UserInfo</Link></form>}
                    </div>
                </div>
            </nav>
        </>
    )
}


