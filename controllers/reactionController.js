const Thought = require('../models/thought');
const User = require('../models/user');

// Controller functions

// Create thought

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};