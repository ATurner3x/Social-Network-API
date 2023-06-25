const User = require('../models/user');
const Thought = require('../models/thought');

// Controller functions

// Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get user by ID

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Create user
  const createUser = async (req, res) => {
    try {
      const { username, email } = req.body;
  
      const user = await User.create({ username, email });
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Update user

  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // Delete user

  const deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
  
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

        // Remove user's associated thoughts
    await Thought.deleteMany({ userId: req.params.userId });

    // Remove user from friend lists
    await User.updateMany({}, { $pull: { friends: req.params.userId } });

    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add friend
const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    const friend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { friends: userId } },
      { new: true }
    );

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    res.json({ user, friend });
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    const friend = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friends: userId } },
      { new: true }
    );

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    res.json({ user, friend });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};