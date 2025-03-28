const express = require('express');
const userModel = require('../../models/usersAdminModel/userModel');
const jwt = require('jsonwebtoken');

const userAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
       
       const admin = await userModel.findOne({ username: username});
       
         // Check if username and password is provided
         if(!username || !password){
            res.status(400).json({message: "Please provide username and password"});
        }

       // Check if admin exists
       if(!admin){
           res.status(400).json({message: "Admin not found"});
       }

       // Check ADMIN Password is correct
       if(admin.password !== password){
              res.status(400).json({message: "Invalid username and password"});
       } 

       // Create token for user/Admin
       const token = jwt.sign({ id: admin._id, role: admin.role, username: admin.username },
        process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
       
        // Send token in HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'none', //PREVENT CSRF ATTACKS
                maxAge: 1000 * 60 * 60 * 24,
            });
        res.status(200).json({ message: " Admin Login successful ", token: token, 
                                user:{username: admin.username, role: admin.role} 
                            });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = { userAdmin };