import React, { useState } from 'react';
import './CreateUser.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    
    const [email, setEmail] = useState();
    const [password, setPassword]=useState();
    const navigate=useNavigate()

    axios.defaults.withCredentials=true; 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login",{email,password})
        .then(res=>{
            if(res.data.Login){
                navigate("/")
            }else{
                console.log("this email is not exist")
                navigate("/login")
            }
        })
        .catch(err=>console.log(err))  
    };
    return (
        <div className="create-user-container">
            <form className="create-user-form" onSubmit={handleSubmit}>
                 <h2>Login</h2>
               
                <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder='Enter Your Email'
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder='Enter Your Password'
                        required/>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">Submit</button>
                    {/* <button type="button" className="btn reset-btn" onClick={handleReset}>Reset</button> */}
                </div>
            </form>
        </div>
    );
};

export default Login;
