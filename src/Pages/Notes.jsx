import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContex'

function Notes() {
    useEffect(() => {
        fetchNotes()
    },[])
    let { logoutUser } = useContext(AuthContext)
    const [notes, setnotes] = useState([])
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

    return (
        <>
            <div>Your Notes</div>
            <div className="container text-center">
                <div className="row m-3">
                    {notes.map((note) => (
                        <div key={note.id} href="/" className="col m-1" >
                            <div className="m-1 h-100 w-100 alert alert-danger fw-bold fade show">
                                {note.note}
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </>
    )
}

export default Notes
