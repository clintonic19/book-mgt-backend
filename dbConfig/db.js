const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Connect to MongoDB
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
         });
         console.log(`Database connected: ${conn.connection.name}`);
     } catch (error) {
         console.error(`Error Connection to MongoDB: ${error.message}`);
         process.exit(1);    
     }
};


module.exports = connectDB;