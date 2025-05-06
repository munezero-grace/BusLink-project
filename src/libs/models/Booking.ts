// src/libs/models/Booking.ts
import mongoose, { Schema, models } from 'mongoose';

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  route: {
    type: Schema.Types.ObjectId,
    ref: 'Route',
    required: true,
  },
  bus: {
    type: Schema.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'mobile_money', 'cash'],
  },
  bookingReference: {
    type: String,
    unique: true,
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

const Booking = models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;
