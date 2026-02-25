// Import mongoose, the library we use to interact with MongoDB
import mongoose from 'mongoose';

/**
 * connectDB Function Summary:
 * This function attempts to connect to the local MongoDB database named 'simba'.
 * It uses async/await because connecting to a database takes time.
 * If successful, it logs a success message.
 * If it fails, it logs the error and stops the Node.js process.
 */
// Define an asynchronous function to handle the database connection
const connectDB = async () => {
    // Start a try-catch block to handle potential connection errors
    try {
        // Await the connection to the 'simba' database
        await mongoose.connect('mongodb://localhost:27017/simba');
        // Log a success message if the connection is established
        console.log('✅ Connected to MongoDB');
        // Catch any errors that occur during the connection attempt
    } catch (err) {
        // Log the error message to the console
        console.error('❌ MongoDB connection error:', err);
        // Force the Node.js process to exit with an error code (1)
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in index.js
export default connectDB;
