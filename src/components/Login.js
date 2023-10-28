import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import noteContext from '../Context/notes/NoteContext'

export const Login = () => {
    const context = useContext(noteContext)
    const {showalert} = context;
    let history = useHistory()
    const [credintials, setcredintials] = useState({ email: '', password: '' })
    const { email, password } = credintials;
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.token)
            showalert('success', 'Logged In Successfully')
            history.push('/')
        }
        else {
            alert('invalid credintials')
        }
    }

    const onchange = (e) => {
        setcredintials({ ...credintials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handlesubmit}>
            <div className="container d-flex justify-content-center mt-5">
                <div className="card" style={{ width: '25rem', height: '450px' }}>
                    <div className="card-body">
                        <h1 style={{ textAlign: 'center', marginTop:'30px' }}>Login</h1>
                        
                        <div className="form-group mt-4">
                            <label style={{ fontWeight: 'bold' }} htmlFor="email">E-mail</label>
                            <input type="email" className="form-control" id="email" name='email'  aria-describedby="emailHelp" required onChange={onchange} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group mt-2">
                            <label style={{ fontWeight: 'bold' }} htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" required onChange={onchange} />
                        </div>
                        <button type='submit' style={{width:'100%', padding: '8px'}} className='btn btn-primary mt-5' >Submit</button>
                    </div>
                </div>
            </div>
            </form>
          
        </>
    )
}

export default Login;