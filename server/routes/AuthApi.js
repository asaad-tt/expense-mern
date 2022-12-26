import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(406).json({ message: "user already exit " });
    return;
  }

  //   hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
  const savedUser = await user.save();
  console.log(savedUser);
  res.status(201).json({ message: "user is created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(406).json({ message: "credential not found " });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    res.status(406).json({ message: "credential not found " });
    return;
  }

  // create jwt token
  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "successfully logged in", token });
});

export default router;
