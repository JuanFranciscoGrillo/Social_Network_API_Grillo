// models/Reaction.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    auto: true
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280 // Ensure this aligns with your requirements
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => timestamp ? new Date(timestamp).toISOString() : null
  }
}, {
  toJSON: {
    getters: true
  },
  id: false
});

module.exports = reactionSchema;
