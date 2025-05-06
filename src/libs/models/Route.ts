// src/libs/models/Route.ts
import mongoose, { Schema, models } from 'mongoose';

const RouteSchema = new Schema({
  routeNumber: {
    type: String,
    required: [true, 'Route number is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Route name is required'],
  },
  startLocation: {
    name: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: String,
  },
  endLocation: {
    name: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: String,
  },
  stops: [{
    name: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
    address: String,
    estimatedTime: Number, // in minutes from route start
  }],
  distance: {
    type: Number, // in kilometers
    required: true,
  },
  estimatedDuration: {
    type: Number, // in minutes
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  schedule: [{
    departureTime: String, // e.g. "08:00", "14:30"
    arrivalTime: String,
    days: [Number], // 0 for Sunday, 1 for Monday, etc.
    active: {
      type: Boolean,
      default: true,
    },
  }],
  trafficConditions: {
    type: String,
    enum: ['light', 'moderate', 'heavy'],
    default: 'moderate',
  },
  busesAssigned: [{
    type: Schema.Types.ObjectId,
    ref: 'Bus',
  }],
  driversAssigned: [{
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  }],
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

// Add geospatial indices
RouteSchema.index({ 'startLocation.coordinates': '2dsphere' });
RouteSchema.index({ 'endLocation.coordinates': '2dsphere' });
RouteSchema.index({ 'stops.coordinates': '2dsphere' });

const Route = models.Route || mongoose.model('Route', RouteSchema);

export default Route;
