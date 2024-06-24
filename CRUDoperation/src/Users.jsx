import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    // call users details on web page
    useEffect(() => {
        axios.get("http://localhost:3001")
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    // logic for delete users
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteuser/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user._id !== id)); // this is for edit
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='users-container'>
            <div className='users-container1'>
                <Link to={"/createuser"} className='btn'>Create User</Link>
                <table>
                    <thead>
                        <tr className='tableraw'>
                            <th className='tableheading'>Name</th>
                            <th className='tableheading'>Email</th>
                            <th className='tableheading'>Phone</th>
                            <th className='tableheading'>Age</th>
                            <th className='tableheading'>Action</th>
                        </tr>
                    </thead> 
                    
                    <tbody>
                        {users.map((item, index) => (
                            <tr key={index}>
                                <td className='tabledata'>{item.name}</td>
                                <td className='tabledata'>{item.email}</td>
                                <td className='tabledata'>{item.phone}</td>
                                <td className='tabledata'>{item.age}</td>
                                <td className='tabledata1'>
                                    <Link to={`/updateuser/${item._id}`} className='btn'>Edit</Link>
                                    <button className='btn' onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
