const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: [true, 'Thought text is required'],
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  reactions: [reactionSchema]
}, {
  toJSON: { virtuals: true, getters: true },
  id: false
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
