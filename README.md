# StaySphere

StaySphere is a comprehensive hotel management system built using the MERN stack, designed to streamline hospitality operations and enhance guest experience.

## Features

- **Property Management**: Efficiently manage hotel properties and room inventory
- **Reservation System**: Handle bookings, check-ins, and check-outs
- **User Authentication**: Secure login system for both staff and guests
- **File Uploads**: Support for image uploads for hotel properties and rooms
- **Data Validation**: Robust form validation to ensure data integrity
- **Session Management**: Persistent user sessions for improved user experience
- **Responsive Design**: Bootstrap-based UI accessible across all devices

## Tech Stack

### Backend
- **Express.js**: Server-side framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Passport.js**: Authentication middleware
- **Joi**: Data validation library
- **Connect-mongo**: Session storage
- **Connect-flash**: Flash messaging
- **Method-override**: HTTP method overrides
- **Cookie-parser**: Cookie parsing middleware

### Frontend
- **EJS & EJS-mate**: Templating engine
- **Bootstrap**: Frontend styling framework

### File Storage
- **Multer**: File uploads handling
- **Cloudinary**: Cloud storage solution
- **Multer-storage-cloudinary**: Integration between Multer and Cloudinary

## Installation

```bash
# Clone the repository
git clone https://github.com/333nischay/StaySphere.git

# Navigate to project directory
cd StaySphere

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with the following variables:
# DB_URI=your_mongodb_uri
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_KEY=your_cloudinary_key
# CLOUDINARY_SECRET=your_cloudinary_secret
# SECRET=your_session_secret

# Run the application
nodemon app.js
```

## Usage

After installation, access the application at `http://localhost:3000` (or the configured port).

- Register/Login to access the system
- Browse hotel properties and rooms
- Make reservations and manage bookings
- Upload property images
- Manage user profiles

## Project Structure

```
StaySphere/
├── app.js              # Application entry point
├── cloudConfig.js      # Cloudinary configuration
├── models/             # Database models
├── routes/             # Application routes
├── controllers/        # Request handlers
├── middlewares/        # Custom middlewares
├── views/              # EJS templates
├── public/             # Static files
├── validationSchema.js # Joi validation schemas
└── package.json        # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

Nischay Sinha - nischaysinha261@gmail.com
GitHub: [https://github.com/333nischay/333nischay](https://github.com/333nischay/333nischay)
