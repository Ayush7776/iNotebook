import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContex'
import { toast } from 'react-toastify'

function Notes() {
    useEffect(() => {
        fetchNotes()
    }, [])
    let { logoutUser } = useContext(AuthContext)

    // This Note  IS Use For Getting All Notes For Specific User
    const [notes, setnotes] = useState([])

    // This memo  IS Use For Getting Singal Note While Updating Note
    const [memo, setmemo] = useState({ "id": "", "note": "", "theme": "" })

    const fetchNotes = async () => {
        let authToken = JSON.parse(localStorage.getItem('authToken'))
        let access = authToken.access
        let response = await fetch('http://127.0.0.1:8000/api/user/notes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
                'content-Type': 'application/json'
            },
        })
        let data = await response.json()
        // console.log({ 'data': data })
        // console.log({ 'response': response })
        if (response.status === 200) {
            setnotes(data)
        }
        else if (response.statusText === 'Unauthorized') {
            logoutUser()
        }
    }

    const deletenote=async(id)=>{
        let authToken = JSON.parse(localStorage.getItem('authToken'))
        let access = authToken.access
        let response = await fetch(`http://127.0.0.1:8000/api/user/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${access}`,
                'content-Type': 'application/json'
            },
        })
        if (response.status === 204) {
            fetchNotes()
        }
        else{

        }
    }

    const getnote = async (id) => {
        let authToken = JSON.parse(localStorage.getItem('authToken'))
        let access = authToken.access
        let response = await fetch(`http://127.0.0.1:8000/api/user/notes/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
                'content-Type': 'application/json'
            },
        })
        let data = await response.json()
        console.log({ 'data': data })
        console.log({ 'response': response })
        if (response.status === 200) {
            setmemo(data)
            console.log(data.id)

        }

    }

    const editNote = async (e,id) => {
        e.preventDefault()
        console.log(e.target.note.value)
        console.log(e.target.theme.value)
        console.log(id)
        let authToken = JSON.parse(localStorage.getItem('authToken'))
        let access = authToken.access
        let response = await fetch(`http://127.0.0.1:8000/api/user/notes/${id}/`,{
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "note": e.target.note.value,
            "theme": e.target.theme.value
          })
        })
        // let data = await response.json()
        // console.log({ 'data': data })
        // console.log({ 'response': response })
        if (response.status === 200) {
            fetchNotes()
        }
        else {
            toast.error('Something Went Wrong')
        }
    
    }
   

    return (
        <>

            <div className="container text-center">
                <div className="row g-2 m-3">
                    {notes.map((note) => (
                        <div key={note.id} className="col-12 m-1">
                            <div className={`m-1 w-100 alert alert-${note.theme} fw-bold fade show`}>
                                <div onClick={() => getnote(note.id)} data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    {note.note}
                                </div>
                                <div onClick={() => deletenote(note.id)}>
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-body">
                            <form action='' onSubmit={(e)=>editNote(e,memo.id)}>
                                <div className="form-floating">
                                    <textarea onChange={(e) => setmemo(e.target.value)} defaultValue={memo.note} className={`my-2 alert alert-${memo.theme} fw-bold fade show`} id="note" placeholder="Leave a comment here" style={{ 'height': '200px','width':'100%'}}></textarea>
                                </div>
                                <select id='theme'  className={`my-2 form-select text-${memo.theme}`} aria-label="Default select example">
                                    <option selected value={memo.theme}>Select Theme</option>
                                    <option className='text-primary' value="primary">Blue</option>
                                    <option className='text-secondary' value="secondary">Grey</option>
                                    <option className='text-success' value="success">Green</option>
                                    <option className='text-danger' value="danger">Red</option>
                                    <option className='text-warning' value="warning">Yellow</option>
                                    <option className='text-info' value="info">Cyan</option>
                                    <option className='text-body-tertiary' value="light">White</option>
                                    <option className='text-dark' value="dark">Black</option>
                                </select>
                                <button  className='btn btn-primary' type='submit' data-bs-dismiss="modal">Save</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Notes
