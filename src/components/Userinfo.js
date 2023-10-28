import React from 'react'

export const Userinfo = () => {
    return (
        <>
            <div  className="container d-flex justify-content-center mt-5">
                <div id='userC' className="card" style={{ width: '25rem', height: '450px' }}>
                    <div className="card-body text-white">
                        <h2 style={{ textAlign: 'center' }}>Your Profile</h2>
                        <div className='mt-5' id='namebox'><strong>NAMEDKDSFSFFSFSFSFSFSFSFSFSDFSDFSFFJ</strong></div>
                        <h4 className='mt-5'>Name : </h4>
                        <p className='mt-3'>Email-Address : </p>
                        <p className='mt-3'>Signed Up : </p>
                        <p className='mt-3'>Totall Notes: </p>
                        <button type='submit' style={{ width: '100%', padding: '8px', position: 'relative', top: '10px' }} className='btn btn-primary' >Go To Home</button>
                    </div>
                </div>
            </div>
        </>
    )
}
