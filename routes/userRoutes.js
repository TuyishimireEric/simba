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
