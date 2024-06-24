import React, { useState, useEffect } from 'react';
import './CreateUser.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone]=useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/getUser/${id}`)
                .then(result => {
                    console.log(result);
                  // this is for showing data on update users
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setPhone(result.data.phone);
                    setAge(result.data.age);
                })
                .catch(err => console.log(err));
        }
    }, [id]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:3001/updateuser/${id}`, { name, email,phone, age })
                .then(result => {
                    console.log(result);
                    navigate("/");
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="create-user-container">
            <form className="create-user-form" onSubmit={handleSubmit}>
                <h2>Update User</h2>
                <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter Your Name'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Your Email'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mobile No.</label>
                    <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='Enter Your Mobile No.'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder='Enter Your Age'
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
