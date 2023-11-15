const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: { virtuals: true },
  id: false
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Error handling middleware
userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Username or email already exists'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
