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

const getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const createThought = async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
  
      const thought = await Thought.create({ thoughtText, username, userId });
  
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const deleteThought = async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
  
      if (!deletedThought) {
        res.status(404).json({ message: 'Thought not found' });
        return;
      }
  
      await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId } });
  
      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
  };