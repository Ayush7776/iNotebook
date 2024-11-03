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
                <Link className="btn btn-dark rounded-5 text-white nav-link active" aria-current="page" to="/" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Notes</Link>
              </li>
              
            </ul>
            <div className="d-flex" role="search">
              <h4 className='mx-3'>Hello {user && user.name}</h4>

              <div className="flex-shrink-0 dropdown">
                <Link to="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1730541993~exp=1730545593~hmac=c213462eb62449ae0e3dd689e1fd9de71ae7e9cf26799facca4baf2b7d25a4b9&w=740" alt="mdo" width="32" height="32" className="rounded-circle" />
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
      <Notes />

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form action="" onSubmit={addNotes}>
                <input className="my-2 fs-5 form-control" placeholder="Write Here" id="note" style={{ 'height': '100px' }} />
                
                <select id='theme' className="my-2 form-select" aria-label="Default select example">
                  <option selected>Select Theme</option>
                  <option className='text-primary' value="primary">Blue</option>
                  <option className='text-secondary' value="secondary">Grey</option>
                  <option className='text-success' value="success">Green</option>
                  <option className='text-danger' value="danger">Red</option>
                  <option className='text-warning' value="warning">Yellow</option>
                  <option className='text-info' value="info">Cyan</option>
                  <option className='text-body-tertiary' value="light">White</option>
                  <option className='text-dark' value="dark">Black</option>
                </select>

                <button className='btn btn-primary' type='submit'>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
