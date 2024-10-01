import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    
    let [authToken, setauthToken] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null)
    let [user, setUser] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('data')):null)
    let navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        let response  = await fetch('http://127.0.0.1:8000/api/user/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'password': e.target.password.value
            })
        })

        let data= await response.json()
        console.log({'data':data})
        console.log({'response':response})

        if(response.status===200){
            setauthToken(data)
            localStorage.setItem('authToken',JSON.stringify(data.token))
            let access=data.token.access
            await userprofile(access)
            navigate("/")
        }
        else{
            alert("SomeThing Went Worng")
        }
    }
    const registerUser= async (e)=>{
        e.preventDefault();
        const response= await fetch('http://127.0.0.1:8000/api/user/register',{
            'method':'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({
                'email':e.target.email.value,
                'name':e.target.name.value,
                'password':e.target.password.value,
                'password2':e.target.password2.value,
                'tc':e.target.tc.value,
            }) 
        })
        const data=await response.json()
        console.log({'data':data})
        console.log({'responce':response})
        if(response.status===200){
            setauthToken(data)
            localStorage.setItem('authToken',JSON.stringify(data.token))
            let access=data.token.access
            await userprofile(access)
            navigate("/")
        }
        else{
            alert("SomeThing Went Worng")
        }
    }
    const userprofile= async (access)=>{
        let response  = await fetch('http://127.0.0.1:8000/api/user/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json',
            },
        })
        let data= await response.json()
        console.log({'data':data})
        console.log({'response':response})
        localStorage.setItem('data',JSON.stringify(data))
        setUser(data)
    }

    const logoutUser=()=>{
        setauthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        localStorage.removeItem('data')
        localStorage.removeItem('access')
        navigate('/login')
    }

    let contextData = {
        user:user,
        authToken:authToken,
        loginUser: loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )


}