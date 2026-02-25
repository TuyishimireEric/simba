# Simba SuperMarket App API (Node.js & Express)

Welcome to the Simba SuperMarket App API! This project is a backend application built with Node.js, Express, and MongoDB. It demonstrates how to create a structured and organized RESTful API using the Model-View-Controller (MVC) pattern.

## Project Structure Explained

A very important part of building applications is keeping your code organized so it's easy to read and maintain. This project uses the **MVC (Model-View-Controller)** pattern conceptually, but since this is an API, we don't have "Views", we return JSON data instead.

Here is what each folder and file does:

```
users/
│
├── config/              # Configuration files
│   └── db.js            # Connects our application to the MongoDB database
│
├── controllers/         # The "brains" of the operation
│   └── userController.js# Contains all the logic for what happens when a user asks for data (CRUD operations)
│
├── models/              # How our data looks
│   └── User.js          # Defines the schema (blueprint) for a User in MongoDB using Mongoose
│
├── routes/              # The "doors" to our application
│   └── userRoutes.js    # Directs incoming requests (like GET /users) to the correct controller logic
│
├── .gitignore           # Tells Git which files/folders to ignore (like node_modules and .env)
├── index.js             # The main entry point of the app. It puts everything together and starts the server
└── package.json         # Stores project metadata, scripts (like 'npm run dev'), and our dependencies
```

## How to Recreate This Project Step-by-Step

If you want to build this from scratch locally, follow these steps:

### 1. Initialize the Project
First, create a new folder and initialize it with `npm`:
```bash
mkdir users
cd users
npm init -y
```

### 2. Install Dependencies
We need three main packages to build this app:
*   `express`: The framework used to build our web server and routes.
*   `mongoose`: An elegant tool used to talk to our MongoDB database.
*   `nodemon`: A helpful development tool that automatically restarts the server when you save file changes.

Install them by running:
```bash
npm install express mongoose
npm install --save-dev nodemon
```

### 3. Update `package.json`
To use modern ES6 Imports (`import x from 'y'`) instead of older CommonJS (`require()`), and to add our handy development script, update your `package.json` file to include:

```json
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js"
  }
```

### 4. Create the Project Structure
Create the folders we defined in the structure section above:
```bash
mkdir config controllers models routes
```

### 5. Write the Code (File by File)

**a) Database Config (`config/db.js`)**
This file handles the connection to your local MongoDB server.
```javascript
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
```

**b) The User Model (`models/User.js`)**
This defines what information a User should have in the database.
```javascript
// Import mongoose to help us define our data structure
import mongoose from 'mongoose';

// Create a new Mongoose Schema, which acts as a blueprint for our User data
const userSchema = new mongoose.Schema({
    // The user's name must be a string and is required
    name: { type: String, required: true },
    // The user's age is a number
    age: { type: Number },
    // The user's email is a string
    email: { type: String },
    // The user's role (e.g., admin, student) is a string
    role: { type: String },
    // The user's grade is a string
    grade: { type: String },
// Enable timestamps to automatically add createdAt and updatedAt dates
}, { timestamps: true });

// Create the 'User' model using the schema and export it. It will use the 'users' collection in MongoDB.
export default mongoose.model('User', userSchema, 'users');
```

**c) The User Controller (`controllers/userController.js`)**
This holds all the functions (Create, Read, Update, Delete) for dealing with Users. Let's look at just getting all users as an example:
```javascript
// Import the User model to interact with the database
import User from '../models/User.js';

/**
 * getAllUsers Function Summary:
 * This function handles GET requests to retrieve all users from the database.
 * It uses the User model's find() method to get the data and sends it back as JSON.
 * If an error occurs, it sends a 500 (Internal Server Error) response.
 */
// Export the asynchronous function to get all users
export const getAllUsers = async (req, res) => {
    // Try to execute the database query
    try {
        // Await the result of finding all users in the database
        const users = await User.find();
        // Send the resulting users back to the client as JSON
        res.json(users);
    // Catch any errors during the process
    } catch (err) {
        // Send a 500 status code and the error message as JSON
        res.status(500).json({ error: err.message });
    }
};
// ... (include the other CRUD functions here)
```

**d) The User Routes (`routes/userRoutes.js`)**
This takes the functions from the controller and attaches them to specific URL endpoints.
```javascript
// Import the express framework to create our router
import express from 'express';
// Import all of our controller functions that contain the route logic
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

// Create a new Express Router instance
const router = express.Router();

// Map a GET request at the root ('/') to the getAllUsers function
router.get('/', getAllUsers);
// Map a POST request at the root ('/') to the createUser function
router.post('/', createUser);

// Map a GET request with an ID parameter ('/:id') to the getUserById function
router.get('/:id', getUserById);
// Map a PUT request with an ID parameter ('/:id') to the updateUser function
router.put('/:id', updateUser);
// Map a DELETE request with an ID parameter ('/:id') to the deleteUser function
router.delete('/:id', deleteUser);

// Export the router so it can be used in index.js
export default router;
```

**e) The Main Application (`index.js`)**
Finally, we bring it all together in the main file! We connect to the DB, set up Express to read JSON, and tell it to use our `userRoutes` for any request that starts with `/users`.
```javascript
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
```

### 6. Run the Application
Make sure you have MongoDB running locally on your computer. Then, in your terminal, run:
```bash
npm run dev
```
You should see messages confirming the server has started and MongoDB is connected!

## API Documentation

For full API documentation, testing, and interaction, please check out our Postman Collection:
[Simba SuperMarket App Postman Documentation](https://www.postman.com/winter-station-732871/simba-supermarket/collection/22393113-82905ff9-ac15-41d2-876a-a5b16b0b67ea)
