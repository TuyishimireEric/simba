# User Management API (Node.js & Express)

Welcome to the User Management API! This project is a backend application built with Node.js, Express, and MongoDB. It demonstrates how to create a structured and organized RESTful API using the Model-View-Controller (MVC) pattern.

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
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/maya');
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
```

**b) The User Model (`models/User.js`)**
This defines what information a User should have in the database.
```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String },
    role: { type: String },
    grade: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');
```

**c) The User Controller (`controllers/userController.js`)**
This holds all the functions (Create, Read, Update, Delete) for dealing with Users. Let's look at just getting all users as an example:
```javascript
import User from '../models/User.js';

// GET all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// ... (include the other CRUD functions here)
```

**d) The User Routes (`routes/userRoutes.js`)**
This takes the functions from the controller and attaches them to specific URL endpoints.
```javascript
import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Define our endpoints
router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

**e) The Main Application (`index.js`)**
Finally, we bring it all together in the main file! We connect to the DB, set up Express to read JSON, and tell it to use our `userRoutes` for any request that starts with `/users`.
```javascript
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// ─── Start Server ─────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

### 6. Run the Application
Make sure you have MongoDB running locally on your computer. Then, in your terminal, run:
```bash
npm run dev
```
You should see messages confirming the server has started and MongoDB is connected!
