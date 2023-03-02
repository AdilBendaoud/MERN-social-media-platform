import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findById(id);
    const foundUserFriends = await Promise.all(
      foundUser.friends.map((id) => User.findById(id))
    );

    res.status(200).json(foundUserFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const addRemouveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const foundUser = await User.findById(id);
    const friend = await User.findById(friendId);
    
    if (foundUser.friends.includes(friendId)) {
      foundUser.friends = foundUser.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((userId) => userId !== id);
    } else {
      foundUser.friends.push(friendId);
      friend.friends.push(id);
    }

    foundUser.save();
    friend.save();
    const foundUserFriends = await Promise.all(
      foundUser.friends.map((id) => User.findById(id))
    );

    res.status(200).json(foundUserFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
