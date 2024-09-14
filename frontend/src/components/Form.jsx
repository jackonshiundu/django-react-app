import { useNavigate } from "react-router-dom";
import api from "../api";
import { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/form.css'
import LoadingIndicator from "./LoadingIndicator";


export const Form = ({route,method}) => {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)
    const name = method == 'Login' ? 'Login' : 'Register';
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        try {
            const res=await api.post(route,{username,password})
            if(method==='Login'){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
                navigate('/')
            }/* else{
                navigate('/login')
            } */
        } catch (error) {

            alert(error)
        }finally{
            setLoading(false)
        }
    }
  return (
   <form onSubmit={handleSubmit} className="form-container">
    <h1>{name}</h1>
    <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="User Name" className="form-input"/> 
    <input type="password" className="form-input" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/> 
    <button type="submit" className="form-button">{loading? <LoadingIndicator/>: {name}} </button>
   </form>
  )
}
