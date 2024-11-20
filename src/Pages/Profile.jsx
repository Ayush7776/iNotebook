import React, { useContext } from 'react'
import '../css/profile.css'
import AuthContext from '../Context/AuthContex'
import Navbar from './Navbar'
import Loading from './Loading'
import { useState } from 'react'

function Profile() {
  let { loading,user,editProfile } = useContext(AuthContext)
  const [name, setname] = useState(user.name)
  const [image, setimage] = useState()
  console.log(image)
  return (
    <>
      <Navbar />
      {
        loading &&
        <Loading />

      }
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form action='' className='localform' onSubmit={editProfile}>
        <h3>Edit Your Profile</h3>
        <label htmlFor="name">Enter Name</label>
        <input onChange={(e) => setname(e.target.value)} type="text" placeholder="Enter Name" id="name" name="name" value={name} />
        
        <label className='form-label' htmlFor="file">Upload Profile Picture</label>
        <input className='form-control' onChange={(e)=> setimage(e.target.files[0])} type="file" placeholder="Upload Profile Pic" id="image" name="image"/>
        <button className='mt-3' type="submit">Update</button>

        
        
      </form>
    </>

  )
}

export default Profile