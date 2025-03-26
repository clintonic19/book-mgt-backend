const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new Schema({

    username:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum: ["user", "admin"],
        required: true
    }
    
});

// Encrypt password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword){  
     await bcrypt.compare(enteredPassword, this.password);
     return;
};

module.exports = mongoose.model('User', userSchema);