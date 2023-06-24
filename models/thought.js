const mongoose = require('mongoose');
const Reaction = require('./reaction');

// import schema from mongoose
const { Schema } = mongoose;

//  create thought schema

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// get total count of reactions on retrieval

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = mongoose.model('Thought', ThoughtSchema);
  
  module.exports = Thought;