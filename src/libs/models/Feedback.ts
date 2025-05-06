// src/libs/models/Feedback.ts
import mongoose, { Schema, models } from 'mongoose';

const FeedbackSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  trip: {
    bus: {
      type: Schema.Types.ObjectId,
      ref: 'Bus',
    },
    route: {
      type: Schema.Types.ObjectId,
      ref: 'Route',
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: 'Driver',
    },
    date: Date,
  },
  type: {
    type: String,
    enum: ['complaint', 'suggestion', 'compliment', 'report'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  status: {
    type: String,
    enum: ['pending', 'under_review', 'resolved', 'dismissed'],
    default: 'pending',
  },
  adminResponse: {
    message: String,
    respondedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    respondedAt: Date,
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

const Feedback = models.Feedback || mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
