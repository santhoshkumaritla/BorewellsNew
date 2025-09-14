const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  villageName: {
    type: String,
    required: true,
    trim: true
  },
  districtName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  feet: {
    type: Number,
    required: true,
    min: 1,
    max: 1000
  },
  oldBoreFeet: {
    type: Number,
    min: 1,
    max: 1000
  },
  serviceType: {
    type: String,
    enum: ['drilling', 'pressing', 'consultation'],
    default: 'drilling'
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'quoted', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
