const User = require('../models/user');
const Thought = require('../models/thought');

// Controller functions

// Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};