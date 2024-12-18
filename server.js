// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, EmailSignup } = require('./models');
const adminRoutes = require('./routes/admin');
const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// API routes go here (if any)
app.use(express.json());

app.post('/api/signup', async (req, res) => {
  try {
    const { email } = req.body;
    // Add your email signup logic here
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
