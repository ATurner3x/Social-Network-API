// reaction.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => dateFormat(createdAt)
  }
});

// Getter function to format the timestamp
const dateFormat = (timestamp) => {
  return new Date(timestamp).toISOString();
};

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;