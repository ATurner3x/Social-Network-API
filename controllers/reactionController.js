const Thought = require('../models/thought');

// Controller functions
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

