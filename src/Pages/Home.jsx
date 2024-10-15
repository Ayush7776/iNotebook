import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContex'
import Notes from './Notes'
import { Link } from 'react-router-dom'

const Home = () => {
  let { user, logoutUser, addNotes } = useContext(AuthContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">{user && user.id}</Link>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <h4 className='mx-3'>Hello {user && user.name}</h4>

              <div className="flex-shrink-0 dropdown">
                <Link to="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </Link>
                <ul className="dropdown-menu text-small shadow" style={{ position: "absolute", inset: "0px 0px auto auto", "margin": '0px', transform: 'translate3d(0.5px, 34px, 0px)' }} data-popper-placement="bottom-end">
                  <li><Link className="dropdown-item" to='/changePassword'>Change Password</Link></li>

                  <li><Link className="dropdown-item" to="/">{user && user.email}</Link></li>
                  {user ?
                    <li><p className="dropdown-item" onClick={logoutUser}>Logout</p></li>
                    :
                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                  }

                </ul>
              </div>

            </div>
          </div>
        </div>
      </nav>
      <div style={{ background: "url('https://plus.unsplash.com/premium_photo-1685136479835-1dfa5dbc5d44?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} className=" overflow-hidden text-center bg-body-tertiary">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">Do not forget</h1>
          <h3 className="fw-normal text-muted mb-3">With iNoteBook</h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">

            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add New Notes
            </button>
            <button className='btn btn-dark'>View Notes</button>
          </div>

        </div>
      </div>
      <Notes />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form action="" onSubmit={addNotes}>
                <input className="fs-5 form-control" placeholder="Write Here" id="note" style={{ 'height': '100px' }} />
                <button className='btn btn-danger' type='submit'>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
