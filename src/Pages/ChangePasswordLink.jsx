import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import '../css/style.css'
import AuthContext from '../Context/AuthContex';
import Loading from './Loading'
import { toast } from 'react-toastify';

const ChangePasswordLink = () => {
    
    let{loading,logoutUser}=useContext(AuthContext)
    let {uid,token}=useParams()


    const linkForgotPassword = async (e) => {
        e.preventDefault()
        let response = await fetch(`https://inotebook-backend-6cei.onrender.com/api/user/resetpassword/${uid}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": e.target.password.value,
                "cpassword": e.target.cpassword.value
            })
        })
        let data = await response.json()
        console.log({ 'data': data })
        console.log({ 'response': response })
        if (response.status === 200) {
            toast.success("Password Change")
            logoutUser()
        }
        else {
            toast.success("Something Went Wrong")
            logoutUser()
        }
        
    }
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
            <form className='localform' method="post" onSubmit={linkForgotPassword}>
                <h3 className=''>Forgot Password</h3>

                <label htmlFor="Email">Password</label>
                <input type="text" placeholder="Enter Email" id="password" name="password" />
                <label htmlFor="Email">Confirm Password</label>
                <input type="password" placeholder="Enter Email" id="cpassword" name="cpassword" />

                <button type="submit">Change Password</button>

            </form>
        </>
    )
}

export default ChangePasswordLink
