import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password, role, age } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user using User.create
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            age
        });

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '1d',
        });

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password directly here
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', {
            expiresIn: '1d',
        });

        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


