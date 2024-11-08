import React, { useContext } from 'react'
import '../css/style.css'
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContex';
import Loading from './Loading'

const Login = () => {
    let { loginUser, loading } = useContext(AuthContext)
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
            <form className='localform' method="post" onSubmit={loginUser}>
                <h3 className=''>Login Here</h3>
                <label htmlFor="Email">Email</label>
                <input type="text" placeholder="Enter Email" id="email" name="email" />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" name="password" />
                <div className=" form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label mx-2 mt-2" htmlFor="exampleCheck1">Remember Me</label>
                </div>
                <button type="submit">Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
                <div className='sname'>
                    <Link to="/register" className='sname' >Create An Account</Link>
                </div>
            </form>
        </>
    )
}

export default Login
