const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRATION_MS, JWT_SECRET } = require("../../config/keys");

//function used for signin and signup
const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  return token;
};

exports.signin = async (req, res) => {
  try {
    const { user } = req;
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.signup = async (req, res) => {
  const { password } = req.body;
  const salts = 10;
  console.log("THIS IS THE PRINTED PASS" + password);
  try {
    const hashedPass = await bcrypt.hash(password, salts);

    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    // res.status(201).json(newUser);
    const token = generateToken(newUser);
    res.json({ token });
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
