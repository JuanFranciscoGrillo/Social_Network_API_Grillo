const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const connectDB = require('./config/connection');

// Sample data
const users = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
  // ... more users
];

const thoughts = [
  {
    thoughtText: 'Here is a cool thought...',
    username: 'user1',
    reactions: [
      {
        reactionBody: 'This is amazing!',
        username: 'user2',
      },
      {
        reactionBody: 'So true!',
        username: 'user2',
      },
    ],
  },
  {
    thoughtText: 'Another interesting thought...',
    username: 'user2',
    reactions: [
      {
        reactionBody: 'Absolutely agree!',
        username: 'user1',
      },
    ],
  },
  // ... more thoughts
];

const seedDatabase = async () => {
  await connectDB();
  
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);
    const modifiedThoughts = thoughts.map(thought => {
      const user = createdUsers.find(user => user.username === thought.username);
      if (user) thought.username = user._id;
      return thought;
    });
    await Thought.insertMany(modifiedThoughts);

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
