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

/**
 * getUserById Function Summary:
 * This function handles GET requests to retrieve a single user by their ID.
 * It expects the ID to be passed in the URL parameters.
 * If the user is found, it returns the user data as JSON.
 * If not, it returns a 404 (Not Found) error.
 */
// Export the asynchronous function to get a single user by ID
export const getUserById = async (req, res) => {
    // Try to execute the database query
    try {
        // Await the result of finding a user by the ID provided in the route parameters
        const user = await User.findById(req.params.id);
        // If no user is found with that ID, return a 404 response
        if (!user) return res.status(404).json({ error: 'User not found' });
        // If the user is found, send their data back as JSON
        res.json(user);
        // Catch any errors during the process
    } catch (err) {
        // Send a 500 status code and the error message as JSON
        res.status(500).json({ error: err.message });
    }
};

/**
 * createUser Function Summary:
 * This function handles POST requests to create a new user.
 * It expects user data in the request body, creates a new User instance, and saves it.
 * Upon success, it returns a 201 (Created) status with the new user's data.
 */
// Export the asynchronous function to create a new user
export const createUser = async (req, res) => {
    // Try to execute the database query
    try {
        // Create a new instance of the User model using the data sent in the request body
        const user = new User(req.body);
        // Await the saving of the new user to the database
        await user.save();
        // Send a 201 status code (Created) and the newly created user as JSON
        res.status(201).json(user);
        // Catch any errors (like validation errors) during the process
    } catch (err) {
        // Send a 400 status code (Bad Request) and the error message as JSON
        res.status(400).json({ error: err.message });
    }
};

/**
 * updateUser Function Summary:
 * This function handles PUT requests to update an existing user based on their ID.
 * It applies the changes sent in the request body and returns the updated user data.
 */
// Export the asynchronous function to update a user
export const updateUser = async (req, res) => {
    // Try to execute the database query
    try {
        // Find a user by ID and update them with the new data from the request body
        const user = await User.findByIdAndUpdate(
            // The ID of the user to update
            req.params.id,
            // The new data to apply
            req.body,
            // Options: return the 'new' updated document, and run schema validators
            { new: true, runValidators: true }
        );
        // If the user to update wasn't found, return a 404 response
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Send the successfully updated user data as JSON
        res.json(user);
        // Catch any errors during the process
    } catch (err) {
        // Send a 400 status code (Bad Request) and the error message as JSON
        res.status(400).json({ error: err.message });
    }
};

/**
 * deleteUser Function Summary:
 * This function handles DELETE requests to remove a user from the database by their ID.
 * It returns a success message upon successful deletion.
 */
// Export the asynchronous function to delete a user
export const deleteUser = async (req, res) => {
    // Try to execute the database query
    try {
        // Find the user by ID and delete them from the database
        const user = await User.findByIdAndDelete(req.params.id);
        // If the user to delete wasn't found, return a 404 response
        if (!user) return res.status(404).json({ error: 'User not found' });
        // Send a success message as JSON
        res.json({ message: 'User deleted successfully' });
        // Catch any errors during the process
    } catch (err) {
        // Send a 500 status code and the error message as JSON
        res.status(500).json({ error: err.message });
    }
};
