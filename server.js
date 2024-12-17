// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, EmailSignup } = require('./models');
const adminRoutes = require('./routes/admin');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Enable CORS for development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
}

// Routes
app.use('/api/admin', adminRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Email signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const signup = await EmailSignup.create({ email });
    
    res.json({ 
      success: true, 
      message: 'Thank you for signing up!' 
    });
  } catch (error) {
    // Handle unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        success: false, 
        message: 'This email is already registered' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }
    
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error signing up. Please try again later.' 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
});
