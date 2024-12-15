
import React, { useContext } from 'react'
import '../css/style.css'
import AuthContext from '../Context/AuthContex';
import Loading from './Loading'
function ForgotPassword() {
    let { forgotPassword, loading } = useContext(AuthContext)
    return (
        <>
            {
                loading &&
                <Loading />

            }
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className='localform' method="post" onSubmit={forgotPassword}>
                <h3 className=''>Forgot Password</h3>
                
                <label htmlFor="Email">Email</label>
                <input type="text" placeholder="Enter Email" id="email" name="email" />
                
                <button type="submit">Forgot</button>

            </form>
        </>
    )
}

export default ForgotPassword
