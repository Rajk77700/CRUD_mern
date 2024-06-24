const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken") ;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const UserModel = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true
}));

mongoose.connect("mongodb://localhost:27017/CRUDmern",{})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Login logic
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({email})
        .then(user =>{
            if(user){
                if(user.password===password){
                    const accessToken=jwt.sign({email:email}, "paste-your-secret-key-here", {expiresIn:"1m"})
                    const refreshToken=jwt.sign({email:email}, "refresh-token-paste-your-secret-key-here", {expiresIn:"5m"})
                    res.cookie('accessToken', accessToken, {maxAge: 60000})
                    res.cookie('refreshToken', refreshToken, {maxAge: 60000, httpOnly:true, secure: true, sameSite: 'strict'})
                    return res.json({Login: true})
                }
            }else{
                res.json({Login: false, Message: "no recorde existed"})
            }
        }).catch(err=> res.json(err)) 
});



             // CRUD OPERATION//
        //----------------------------//
// Create user
app.post("/createuser", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Display (Read) all users on frontend
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Get user by id for displaying updating field
app.get("/getUser/:id", (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

// Update user
app.put("/updateuser/:id", (req, res) => {
    UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err));
});

// Delete user
app.delete("/deleteuser/:id", (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
