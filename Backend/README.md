# BoreWell Backend API

This is the backend API for the BoreWell booking system that stores booking details in MongoDB and sends email notifications.

## Features

- ✅ Store booking details in MongoDB
- ✅ Send email notifications to owner
- ✅ Input validation
- ✅ Error handling
- ✅ RESTful API endpoints

## Setup Instructions

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment Variables

Update the `config.env` file with your email credentials:

```env
MONGODB_URI=mongodb+srv://root:root@cluster0.lsiciv4.mongodb.net/borewell_bookings
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=itlasanthoshkumar@gmail.com
```

### 3. Gmail Setup (for email notifications)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status

## Database Schema

```javascript
{
  name: String (required),
  villageName: String (required),
  districtName: String (required),
  mobileNumber: String (required),
  feet: Number (required, 1-1000),
  status: String (pending/contacted/quoted/completed),
  createdAt: Date,
  updatedAt: Date
}
```

## Email Notifications

When a booking is created, an email is automatically sent to `itlasanthoshkumar@gmail.com` with:
- Customer details
- Booking requirements
- Direct call/WhatsApp links
- Professional HTML formatting

## Testing

Test the API using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "villageName": "Test Village",
    "districtName": "Test District",
    "mobileNumber": "9876543210",
    "feet": 200
  }'
```
