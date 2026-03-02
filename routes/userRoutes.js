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
import { protect } from '../middleware/auth.js';

// Create a new Express Router instance
const router = express.Router();

// Protected routes
router.use(protect);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
// Map a DELETE request with an ID parameter ('/:id') to the deleteUser function
router.delete('/:id', deleteUser);

// Export the router so it can be used in index.js
export default router;
