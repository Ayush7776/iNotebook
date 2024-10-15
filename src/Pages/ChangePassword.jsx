import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContex'

function ChangePassword() {
    let {user,changePassword}=useContext(AuthContext)
  return (
    <>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className='localform' method="post" onSubmit={changePassword}>
                <h3>Change Your Password {user.name}</h3>
                <label htmlFor="password">New Password</label>
                <input type="text" placeholder="Enter New Password" id="password" name="password" />

                <label htmlFor="password">Confirm New Password</label>
                <input type="password" placeholder="Confirm New Password" id="password2" name="password2" />
                <button className=' mt-3' type="submit">Change Password</button>
                
            </form>
        </>
  )
}

export default ChangePassword
