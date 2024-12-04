const User = require('../models/user');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, 'secret', { expiresIn: '2m' });

    res.status(201).json({
      message: 'User created',
      user: { name: user.name, email: user.email },
      token: token, 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.update(
      { name, email, password },
      { where: { id } }
    );
    if (user[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

const fetchUsersFromAPI = async (req, res) => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const users = response.users;
  
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users from external API', error: err.message });
    }
  };

module.exports = {registerUser,getUsers,updateUser,deleteUser,fetchUsersFromAPI};
