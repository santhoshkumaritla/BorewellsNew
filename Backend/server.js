const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const Booking = require('./models/Booking');
const { sendBookingNotification } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BoreWell API is running',
    timestamp: new Date().toISOString()
  });
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, villageName, districtName, mobileNumber, email, feet, oldBoreFeet, serviceType } = req.body;

    // Validate required fields
    if (!name || !villageName || !districtName || !mobileNumber || !email || !feet) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate mobile number format (basic validation)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Validate feet (should be a positive number)
    const feetNumber = parseInt(feet);
    if (isNaN(feetNumber) || feetNumber < 1 || feetNumber > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid depth between 1 and 1000 feet'
      });
    }

    // Create booking
    const booking = new Booking({
      name: name.trim(),
      villageName: villageName.trim(),
      districtName: districtName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim().toLowerCase(),
      feet: feetNumber,
      oldBoreFeet: oldBoreFeet ? parseInt(oldBoreFeet) : undefined,
      serviceType: serviceType || 'drilling'
    });

    const savedBooking = await booking.save();

    // Send email notification
    const emailResult = await sendBookingNotification(savedBooking);
    
    if (!emailResult.success) {
      console.error('Failed to send email notification:', emailResult.error);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        id: savedBooking._id,
        name: savedBooking.name,
        status: savedBooking.status,
        createdAt: savedBooking.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// Get all bookings (for admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// Get booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking'
    });
  }
});

// Update booking status
app.patch('/api/bookings/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'contacted', 'quoted', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking status'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications will be sent to: ${process.env.OWNER_EMAIL}`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI.split('@')[1]}`);
});
