import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/logout", authMiddleware, async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Save token in blacklist with expiration (from JWT exp)
    const decoded = req.user;
    await Blacklist.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });

    return res.json({ message: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Logout failed" });
  }
});

router.get("/verify", authMiddleware, (req, res) => {
  res.json({
    valid: true,
    user: req.user, // user data from token
  });
});

export default router;
