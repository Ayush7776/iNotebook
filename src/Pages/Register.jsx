import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContex';
import Loading from './Loading'

const Register = () => {
    const { registerUser, loading } = useContext(AuthContext)
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
            <form className='localform' method="post" onSubmit={registerUser}>
                <h3>Register</h3>
                <input type="text" placeholder="Enter Name" id="name" name="name" />
                <input type="text" placeholder="Enter Email" id="email" name="email" />
                <input type="password" placeholder="Password" id="password" name="password" />
                <input type="password" placeholder="Confirm Password" id="password2" name="password2" />
                <div className=" form-check">
                    <input type="checkbox" className="form-check-input" id="tc" name='tc' />
                    <label className="form-check-label mx-2 mt-2" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit">Register</button>



                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
                <div className='sname'>
                    <Link to="/login" className='sname mx-2' >Alredy Have An Account</Link>
                </div>

            </form>
        </>

    )
}

export default Register
