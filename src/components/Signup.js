import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import noteContext from '../Context/notes/NoteContext'

export const Signup = () => {
    const context = useContext(noteContext)
    const {showalert} = context;
    let history = useHistory()
    const [credintails, setcredintails] = useState({ name: '', email: '', password: '', cpassword: '' })
    const handlesubmit = async (e) => {
        e.preventDefault()

        const { name, email, password, cpassword } = credintails;
        if (password !== cpassword) {
            console.log('not matched')
            return
        }

        const response = await fetch('http://localhost:5000/api/auth/newuser', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ name, email, password, cpassword })
        })
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.token)
            history.push('/login')
            showalert('info', `Great! Use your credentials to log in and start.`)
        }
        else {
            alert('invalid credintials')
        }

    }
    const onchange = (e) => {
        setcredintails({ ...credintails, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="container d-flex justify-content-center mt-5">
                    <div className="card" style={{ width: '25rem', height: '550px' }}>
                        <div className="card-body">
                            <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Signup</h1>

                            <div className="form-group mt-2">
                                <label style={{ fontWeight: 'bold' }} htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name='name'aria-describedby="emailHelp" required onChange={onchange} />
                            </div>
                            <div className="form-group mt-4">
                                <label style={{ fontWeight: 'bold' }} htmlFor="email">E-mail</label>
                                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" required onChange={onchange} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mt-2">
                                <label style={{ fontWeight: 'bold' }} htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name='password'  aria-describedby="emailHelp" required onChange={onchange} />
                            </div>
                            <div className="form-group mt-2">
                                <label style={{ fontWeight: 'bold' }} htmlFor="cpassword"> Confirm Password</label>
                                <input type="password" className="form-control" id="cpassword" name='cpassword' aria-describedby="emailHelp" required onChange={onchange} />
                            </div>
                            <button type='submit' style={{ width: '100%', padding: '8px' }} className='btn btn-primary mt-4' >Submit</button>

                        </div>

                    </div>
                </div>
            </form>
       
        </>
    )
}

export default Signup;