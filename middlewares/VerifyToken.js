const jwt = require('jsonwebtoken');

const verifyAdminToken =  (req, res, next) => {
    const token = req.headers['authorization' || "Authorization" ]?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. Only Admin is Allowed' });
        // return res.status(201).json({ message: 'Access Granted.  Admin is Allowed' });
    }
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
    })

}


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