import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../Context/AuthContex'

function Navbar() {
    let location = useLocation()

    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            location.pathname === "/"
                                ?
                                (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="btn btn-dark rounded-5 text-white nav-link active" aria-current="page" to="/" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Notes</Link>
                                    </li>

                                </ul>)
                                :
                                (<ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>)

                        }
                        <div className="d-flex" role="search">
                            <h4 className='mx-3'>Hello {user && user.name}</h4>

                            <div className="flex-shrink-0 dropdown">
                                <Link to="/" className="d-block link-body-emphasis text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal3" aria-expanded="true">
                                    <img src={`https://inotebook-backend-6cei.onrender.com${user.profile_pic}`} alt="mdo" width="32" height="32" className="rounded-circle" />
                                </Link>


                                <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{ backgroundColor: "transparent", border: "none", marginLeft: "100px" }}>
                                            <div className="modal-body">
                                                <div className="card">
                                                    <button type="button" className="btn-close position-absolute top-0 end-0 me-3" data-bs-dismiss="modal" aria-label="Close"></button>


                                                    <div className="top-container ">

                                                        <img src={`https://inotebook-backend-6cei.onrender.com${user.profile_pic}`} alt='profile' className="img-fluid profile-image rounded-5 shadow-lg" width="150" />

                                                    </div>

                                                    <div className="ml-3 text-center">
                                                        <h5 className="name">{user.name}</h5>
                                                        <p className="mail">{user.email}</p>
                                                    </div>
                                                    <div className="recent-border mt-4" data-bs-dismiss="modal">
                                                        <Link to="/profile" className="recent-orders nav-link" >Edit Profile</Link>
                                                    </div>

                                                    <div className="wishlist-border pt-2" data-bs-dismiss="modal">
                                                        <Link to="/changePassword" className="wishlist nav-link" >Change Password</Link>
                                                    </div>

                                                    <div className="fashion-studio-border pt-2" data-bs-dismiss="modal">
                                                        <Link onClick={logoutUser} className="fashion-studio nav-link">Logout</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
