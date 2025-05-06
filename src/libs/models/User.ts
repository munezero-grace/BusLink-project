// src/libs/models/User.ts
import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  cardNumber: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// If the User model does not exist, create a new one
const User = models.User || mongoose.model('User', UserSchema);

export default User;
