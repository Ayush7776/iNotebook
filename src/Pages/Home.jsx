import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContex'

const Home = () => {
  let { user, logoutUser } = useContext(AuthContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">iNoteBook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">{user && user.id}</a>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <h4 className='mx-3'>Hello {user && user.name}</h4>

              <div className="flex-shrink-0 dropdown">
                <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small shadow" style={{ position: "absolute", inset: "0px 0px auto auto", "margin": '0px', transform: 'translate3d(0.5px, 34px, 0px)' }} data-popper-placement="bottom-end">
                  <li><a className="dropdown-item" href="/">{user && user.email}</a></li>
                  {user ?
                    <li><p className="dropdown-item" onClick={logoutUser}>Logout</p></li>
                    :
                    <li><a className="dropdown-item" href="/login">Login</a></li>
                  }
                </ul>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Home
