import React, { useContext } from 'react'
import { Navigate, useParams, } from 'react-router-dom';
import '../css/style.css'
import AuthContext from '../Context/AuthContex';
import Loading from './Loading'
import { toast } from 'react-toastify';

const ChangePasswordLink = () => {

    let { loading, logoutUser } = useContext(AuthContext)
    let { uid, token } = useParams()
    let navigate=Navigate()


    const linkForgotPassword = async (e) => {
        loading(true)
        try {
            e.preventDefault()
            let response = await fetch(`https://inotebook-backend-6cei.onrender.com/api/user/resetpassword/${uid}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "password": e.target.password.value,
                    "password2": e.target.password2.value
                })
            })
            let data = await response.json()
            console.log({ 'data': data })
            console.log({ 'response': response })
            if (response.status === 200) {
                toast.success("Password Reset Sucessfully,Login Using New Password")
                logoutUser()

            }
            else {
                toast.error("Something Went Wrong")
                logoutUser()

            }
        } catch (error) {
            navigate("/notfound")
            toast.error("Server Is Unrechable")

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

                <label htmlFor="password">Password</label>
                <input type="text" placeholder="Enter Email" id="password" name="password" />
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" placeholder="Confirm Password" id="password2" name="password2" />

                <button type="submit">Change Password</button>

            </form>
        </>
    )
}

export default ChangePasswordLink
