const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Enhanced security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting with enhanced security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// CORS configuration with enhanced security
const corsOptions = {
  origin: ['http://localhost:5000', 'http://127.0.0.1:5000'], // Allow your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));

// Enhanced JSON parser with size limit
app.use(express.json({ 
  limit: '10kb',
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  }
}));

// MongoDB connection with enhanced security options
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  rejectUnauthorized: true,
  minPoolSize: 10,
  maxPoolSize: 100,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Secure input validation middleware
const validateContact = [
  // Name validation
  body('name')
    .trim()
    .matches(/^[a-zA-Z\u0600-\u06FF\s]{2,50}$/)
    .withMessage('الاسم يجب أن يكون بين 2-50 حرفاً ويحتوي على أحرف عربية أو إنجليزية فقط')
    .escape(),

  // Enhanced email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('البريد الإلكتروني مطلوب')
    .isEmail()
    .withMessage('الرجاء إدخال بريد إلكتروني صحيح')
    .normalizeEmail()
    .custom((value) => {
      // Check for common email providers
      const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = value.split('@')[1];
      if (!allowedDomains.includes(domain)) {
        throw new Error('نحن نقبل فقط عناوين البريد الإلكتروني من: Gmail, Yahoo, Hotmail, Outlook');
      }
      return true;
    }),

  // Message validation
  body('message')
    .trim()
    .notEmpty()
    .withMessage('الرسالة مطلوبة')
    .isLength({ max: 1000 })
    .withMessage('الرسالة يجب ألا تتجاوز 1000 حرف')
    .escape()
];

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// POST /contact with validation
app.post('/contact', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array().map(error => ({
        msg: error.msg,
        param: error.param
      }))
    });
  }

  const { name, email, message } = req.body;

  try {
    if (!mongoose.models.Message) {
      return res.status(500).json({ 
        success: false, 
        message: 'Server configuration error' 
      });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    
    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid data provided' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 HTTP Server is running on http://localhost:${PORT}`);
});
