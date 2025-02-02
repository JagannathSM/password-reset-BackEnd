const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    passResetToken:{
        type:String,
        required:false
    },
    passResetTokenExp:{
        type:Date,
        required:false
    }
})

const User = mongoose.model("User",UserSchema)
 module.exports = User;