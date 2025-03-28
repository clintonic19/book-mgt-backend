const jwt = require('jsonwebtoken');
const userModel = require('../models/usersAdminModel/userModel');
dotenv = require('dotenv');
dotenv.config();

const verifyAdminToken = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        // const token = req.headers.authorization || req.headers.Authorization; /
        const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
        console.log('Token received2:',typeof(req.headers),":::",req.headers.authorization ); // Debug

    if (!token) { return res.status(401).json({ message: 'Access Denied. Only Admin is Allowed' }) };
        // return res.status(201).json({ message: 'Access Granted.  Admin is Allowed' });
    
    // else{
    //     // return res.status(401).json({ message: 'Access Denied. Only Admin is Allowed' });
    //     return res.status(201).json({ message: 'Access Granted.  Admin is Allowed' });
    // }

    //CHECK IF TOKEN IS VALID then VERIFY TOKEN USER
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
        req.user = user;
        next();
    });

    // let token = req.cookies.token;
    // if (token) {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   const user = await userModel.findById(decoded.userId).select("isAdmin email");
    //   req.user = {
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     userId: decoded.userId,
    //   };
    //   next();
    // } 
    
} catch (error) {
        console.error(error);
        return res
          .status(401)
          .json({ status: false, message: "Not Allowed, Please Login" });
        
    }

}

//  const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     console.log('Token received:', token); // Debug
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
//     // Verify token logic...

//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid credentials' });
//         }
//         req.user = user;
//         next();
//     });
//   };


// VALIDATE TOKEN
// const validateToken = asyncHandler(async (req, res, next) => {

//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;

//     // Authenticating users from authHeader
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401);
//                 throw new Error("User Authorization Failed");
//             }
//             req.user = decoded.user;
//             next();
//             console.log("User Authorization Successful")
//         });

//         if (!token) {
//             res.status(401);
//             throw new Error("Unauthorized User or Token");
//         };
//     };
// });

module.exports = verifyAdminToken;