const mongoose=require('mongoose')
const bcrypt = require('bcrypt');

// modes for CreateUser
const UserSchema =new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number
})

UserSchema.pre('save',async function(){
    // console.log("pre method ",this);
    const user = this;

    if (!user.isModified("password")){
        next();
    }
    try {
        const saltRound= await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password=hash_password
    } catch (error) {
        next(error);
    }
})

const UserModel=mongoose.model("users", UserSchema) // (users) this is the connection name, database ke andar show karega
module.exports=UserModel