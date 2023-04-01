const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv');


// Handle the uncaught exceptions 
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to uncaught exception');
    // Close server & exit process
    process.exit(1);
})

//setting up config file
dotenv.config({path: 'backend/config/config.env'})


// connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} node.`)
})

//Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    // Close server & exit process
    server.close(() => process.exit(1));
})