const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: [true, 'Reaction body is required'],
    maxlength: 280
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toISOString()
  }
}, {
  toJSON: { getters: true }
});

module.exports = reactionSchema;
