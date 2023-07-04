const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Route handler for sign-in
router.post('/', async (req, res) => {
    const { username, password } = req.body;
   console.log('username:',username);
   console.log('password:',password);
    try {
      // Find the user in the database
      const user = await User.findOne({ username });
  
      // Verify the user
      if (user && user.password === password) {
        res.json({ message: 'User verified' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Failed to sign in' });
    }
  });

  module.exports = router;