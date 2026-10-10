const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./usermodels');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
// Put your actual connection string in the .env file.
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('MONGO_URI is missing. Check your .env file.');
}
mongoose
  .connect(MONGO_URI)
  .then(() => {console.log('MongoDB connected successfully');
  app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
}
)
  .catch((err) => console.error('MongoDB connection error:', err));

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Username, email and password are required.'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        error: 'This email is already registered.'
      });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully.'
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      error: 'Registration failed.'
    });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'User not found. Please register first.'
      });
    }

    // This comparison assumes your model currently stores
    // plaintext passwords. Use bcrypt hashes in production.
    if (user.password !== password) {
      return res.status(401).json({
        error: 'Invalid password.'
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      username: user.username
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      error: 'Login failed.'
    });
  }
});

// Start server after MongoDB connects successfully
