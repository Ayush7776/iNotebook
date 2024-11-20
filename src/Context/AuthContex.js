import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    
    
    let [authToken, setauthToken] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('data')) : null)
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate()


    const loginUser = async (e) => {
        setLoading(true)
        e.preventDefault()
        let response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })

        let data = await response.json()
        // //console.log({ 'data': data })
        // //console.log({ 'response': response })

        if (response.status === 200) {
            setauthToken(data)
            localStorage.setItem('authToken', JSON.stringify(data.token))
            let access = data.token.access
            await userprofile(access)
            navigate("/")
            toast.success(data.msg)
            setLoading(false)
        }
        else {
            toast.error(data.msg)
            setLoading(false)
        }
    }
    const registerUser = async (e) => {
        setLoading(true)
        e.preventDefault();
        const response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/register', {
            'method': 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'name': e.target.name.value,
                'password': e.target.password.value,
                'password2': e.target.password2.value,
                'tc': e.target.tc.value,
            })
        })
        const data = await response.json()
        // //console.log({ 'data': data })
        // //console.log({ 'responce': response })
        if (response.status === 200) {
            setauthToken(data)
            localStorage.setItem('authToken', JSON.stringify(data.token))
            let access = data.token.access
            await userprofile(access)
            toast.success(data.msg)
            navigate("/")
            setLoading(false)
        }
        else {
            toast.error("Something Went Wrong")
            setLoading(false)
        }
    }
    const userprofile = async (access) => {
        setLoading(true)
        let response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        // //console.log({ 'data': data })
        // //console.log({ 'response': response })
        localStorage.setItem('data', JSON.stringify(data))
        setUser(data)
        setLoading(false)
    }

    const changePassword = async (e) => {
        setLoading(true)
        e.preventDefault()
        let authToken =JSON.parse(localStorage.getItem('authToken'))
        let access=authToken.access
        let response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/changepassword', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access}`,
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': e.target.password.value,
                'password2': e.target.password2.value
            })
        })

        let data = await response.json()
        // //console.log({ 'data': data })
        // //console.log({ 'response': response })
        if (response.status === 200) {
            toast.success(data.msg)
            await userprofile(access)
            navigate("/")
            setLoading(false)
        }
        else {
            toast.error(data.msg)
            setLoading(false)
        }
    }

    const editProfile= async (e)=>{
        e.preventDefault()
        if (!e.target.image.files[0] || !e.target.name.value) {
            toast.error("Please Fill Up Require Fileds")
            return
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('profile_pic', e.target.image.files[0]);
        formData.append('name', e.target.name.value);

        let authToken =JSON.parse(localStorage.getItem('authToken'))
        let access=authToken.access
        let response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/editprofile', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${access}`,
            },
            body:formData
        })
        // let data = await response.json()
        //console.log({ 'data': data })
        //console.log({ 'response': response })
        if (response.status===200){
            toast.success("Profile Updated Sucessfully")
            userprofile(access)
            navigate("/")
            setLoading(false)
        }
        else{
            toast.error("Something Went Wrong")
            setLoading(false)
        }
        

    }
    


    const logoutUser = () => {
        setLoading(true)
        setauthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('data')
        localStorage.removeItem('access')
        navigate('/login')
        setLoading(false)
        toast.warning("Logout Succesfully")
    }
    // Function For Adding Or Fetching Notes

    const addNotes = async (e) => {
        setLoading(true)
        e.preventDefault()
        //console.log(e.target.note.value)
        let authToken = JSON.parse(localStorage.getItem('authToken'))
        let access = authToken.access
        let response = await fetch('https://inotebook-backend-6cei.onrender.com/api/user/notes/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "note": e.target.note.value,
            "theme": e.target.theme.value
          })
        })
        let data = await response.json()
        // //console.log({ 'data': data })
        // //console.log({ 'response': response })
        if (response.status === 201) {
            window.location.reload("/");
            setLoading(false)
        }
        else {
            toast.error(data.msg)
            setLoading(false)
        }
    
    }
   
   

    let contextData = {
        user: user,
        authToken: authToken,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        changePassword:changePassword,
        editProfile:editProfile,
        addNotes:addNotes,
        loading:loading,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )


}