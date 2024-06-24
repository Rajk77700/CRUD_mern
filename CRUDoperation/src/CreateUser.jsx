import React, { useState } from 'react';
import './CreateUser.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const CreateUser = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword]=useState();
    const [phone, setPhone] = useState();
    const [age, setAge] = useState();
    const navigate=useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createuser",{name,email,password,phone,age})
        .then(result=>{console.log(result)
            navigate("/login")
        })
        .catch(err=>console.log(err))
        
    };

  

    return (
        <div className="create-user-container">
            <form className="create-user-form" onSubmit={handleSubmit}>
                 <h2>Create User</h2>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        onChange={(e)=>setName(e.target.value)}
                        placeholder='Enter Your Name'
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="Phone">Mobile No.</label>
                    <input
                        type="number"
                        onChange={(e)=>setPhone(e.target.value)}
                        placeholder='Enter Your Mobile No.'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Age">Age</label>
                    <input
                        type="number"
                        onChange={(e)=>setAge(e.target.value)}
                        placeholder='Enter Your Age'
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">Submit</button>
                    <Link to={"/login"}>Login</Link>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
