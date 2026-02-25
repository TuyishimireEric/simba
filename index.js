// Import the express framework to create our web server
import express from 'express';
// Import our database connection function from the config folder
import connectDB from './config/db.js';
// Import the routes for managing users
import userRoutes from './routes/userRoutes.js';

// Call the function to connect to our MongoDB database
connectDB();

// Create an instance of the express application
const app = express();

// Middleware: Tell express to parse incoming request bodies as JSON
app.use(express.json());

// Routes: Tell express to use the userRoutes for any request that starts with '/users'
app.use('/users', userRoutes);

// ─── Start Server ─────────────────────────────────────────
// Define the port number our server will listen on
const PORT = 3000;
// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    // Log a message to the console to confirm the server is running
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});