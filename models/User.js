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
