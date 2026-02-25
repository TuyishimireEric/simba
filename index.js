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