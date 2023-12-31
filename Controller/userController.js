const userModel = require("../Models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, secretKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });
    console.log(user);
    if (user) return res.status(400).json("User already exist");

    if (!name || !email || !password)
      return res.status(400).json("All fields are required...");

    if (!validator.isEmail(email)) return res.status(400).json("Email invalid");

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Email invalid");

    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json("invalid  password");
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) return res.status(400).json(`User of id: ${userId} not found`);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await userModel.find();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { registerUser, login, findUser, getUsers };
