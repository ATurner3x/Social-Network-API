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

// Get user by ID

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Create user
  const createUser = async (req, res) => {
    try {
      const { username, email } = req.body;
  
      const user = await User.create({ username, email });
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Update user

  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };