import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContex'
import Notes from './Notes'
import Loading from './Loading'
import Navbar from './Navbar'
const Home = () => {
  let {user,addNotes, loading } = useContext(AuthContext)
  console.log(user)
  return (
    <>
      {
        loading &&
        <Loading />
      }
      <Navbar/>
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