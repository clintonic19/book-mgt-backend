const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
var cookieParser = require('cookie-parser')


//LOCAL IMPORTS
const bookRoutes = require("./routes/bookRoutes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes/orderRoutes");
const userRoutes = require("./routes/usersAdminRoutes/userRoute");
const AdminRoutes = require("./stats/admin.statistic");
const connectDB = require('./dbConfig/db');
const {errorHandler, routeNotFound} = require('./middlewares/errorHandlers')

//EXPRESS SESSION
const app = express();

//Load env variables
dotenv.config();

//Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5002', "https://book-mgt.vercel.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization" || "authorization"]
}));

//Connect to database
connectDB();

const _dirname = path.resolve();

//Body parser
app.use(express.json());
app.use(cookieParser())

const PORT = process.env.PORT || 5002

//Routes Middleware 
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', AdminRoutes);

//Error Handlers
app.use(routeNotFound);
app.use(errorHandler);

//SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Application Listening on Port ${PORT}`)
})

// Add error handling for the server Or any unhandled exceptions
app.on('error', (err) => {
    if (err.code === 'EACCES') {
        console.error(`Permission denied on port ${PORT}. Try running with elevated privileges or using a different port.`);
        process.exit(1);
    } else if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Choose a different port.`);
        process.exit(1);
    } else {
        console.error('Unhandled server error:', err);
        process.exit(1);
    }
});

process.on('uncaughtException', (err) => {
    console.error('Unhandled exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
