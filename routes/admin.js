const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const authMiddleware = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await admin.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ 
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected route example
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.adminId);
    res.json({ 
      message: 'Welcome to admin dashboard',
      admin: {
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;