// controllers/userController.js
const { User, Thought } = require('../models');

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}).populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }

      // Delete user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      await user.remove();

      res.json({ message: 'User and their thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Additional methods for friends (POST and DELETE) can be added here
};

module.exports = userController;
