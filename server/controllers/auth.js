import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath, bio, location } =
      req.body;
    const salt = await bcrypt.genSalt();
    const passwdHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwdHash,
      picturePath,
      bio,
      location,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) res.status(400).json({ error: "user not found" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) res.status(400).json({ error: "password is not correct" });

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY);
    delete foundUser.password;
    res.status(200).json({ token, foundUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
