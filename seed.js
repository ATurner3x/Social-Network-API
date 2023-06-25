const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const user1 = new User({
      username: 'johnDoe',
      email: 'johndoe@example.com',
    });

    const user2 = new User({
      username: 'janeSmith',
      email: 'janesmith@example.com',
    });

    // Add friends
    user1.friends.push(user2._id);
    user2.friends.push(user1._id);

    // Save users
    await user1.save();
    await user2.save();

    // Create thoughts
    const thought1 = new Thought({
      thoughtText: 'Hello world!',
      username: user1.username,
    });

    const thought2 = new Thought({
      thoughtText: 'I love coding!',
      username: user2.username,
    });

    // Save thoughts
    await thought1.save();
    await thought2.save();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
