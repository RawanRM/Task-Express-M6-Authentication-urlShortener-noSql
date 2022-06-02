const User = require("../../models/User");
const bcrypt = require("bcrypt");

exports.signin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  const { password } = req.body;
  const salts = 10;
  try {
    const hashedPass = await bcrypt.hash(password, salts);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("urls");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
