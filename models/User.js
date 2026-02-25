import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String },
    role: { type: String },
    grade: { type: String },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');
