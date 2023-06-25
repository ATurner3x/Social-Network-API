const Thought = require('../models/thought');

// Controller functions

// Create thought
const createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReaction = async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
  
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
  
      if (!updatedThought) {
        res.status(404).json({ message: 'Thought or reaction not found' });
        return;
      }
  
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    createReaction,
    deleteReaction,
  };


