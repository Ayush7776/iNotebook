import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContex'

function Navbar() {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><span className='fw-normal'>{user && user.name}'s</span> iNoteBook</Link>
                    <Link to="/" className="d-flex d-lg-none border border-3 rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal3" aria-expanded="true">
                        <img src={`https://inotebook-backend-6cei.onrender.com${user.profile_pic}`} alt="mdo" width="32" height="32" className="rounded-circle" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        <div className="d-flex" role="search">
                            <div className="d-none d-lg-flex border border-3 rounded-circle">
                                <Link to="/" className="d-block link-body-emphasis text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal3" aria-expanded="true">
                                    <img src={`https://inotebook-backend-6cei.onrender.com${user.profile_pic}`} alt="mdo" width="32" height="32" className="rounded-circle" />
                                </Link>
                                <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{ backgroundColor: "transparent", border: "none" }}>
                                            <div className="modal-body m-auto">
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
