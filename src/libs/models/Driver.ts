// src/libs/models/Driver.ts
import mongoose, { Schema, models } from 'mongoose';

const DriverSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true,
  },
  licenseExpiry: {
    type: Date,
    required: [true, 'License expiry date is required'],
  },
  experience: {
    type: Number, // years of experience
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  efficiency: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  assignedBus: {
    type: Schema.Types.ObjectId,
    ref: 'Bus',
    default: null,
  },
  assignedRoute: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    default: null,
  },
  arrivalTimes: [{
    date: Date,
    arrivedAt: Date,
    scheduledAt: Date,
    onTime: Boolean,
  }],
  isAvailable: {
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

const Driver = models.Driver || mongoose.model('Driver', DriverSchema);

export default Driver;
