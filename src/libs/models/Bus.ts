// src/libs/models/Bus.ts
import mongoose, { Schema, models } from 'mongoose';

const BusSchema = new Schema({
  busNumber: {
    type: String,
    required: [true, 'Bus number is required'],
    unique: true,
  },
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    unique: true,
  },
  model: {
    type: String,
    required: [true, 'Bus model is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
  },
  features: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive', 'blocked'],
    default: 'active',
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0],
    },
    address: {
      type: String,
      default: '',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  assignedDriver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
    default: null,
  },
  assignedRoute: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    default: null,
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

// Add geospatial index
BusSchema.index({ 'currentLocation.coordinates': '2dsphere' });

const Bus = models.Bus || mongoose.model('Bus', BusSchema);

export default Bus;
