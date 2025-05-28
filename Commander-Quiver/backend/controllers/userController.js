"use strict";
const User = require("../models/User"); // Mongoose model

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Please provide an email and password" });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already exists with this email" });
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: password, // Storing password
    });

    const userResponse = {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });

  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
        return res.status(400).json({ success: false, error: "Email already in use." });
    }
    res.status(500).json({ success: false, error: error.message || "Server Error during registration" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Please provide an email and password" });
  }

  try {
    // Find user by email. If password had select:false, you'd need .select('+password')
    const user = await User.findOne({ email: email.toLowerCase() });
    // const user = await User.findOne({ email: email.toLowerCase() }).select('+password'); // If select: false in schema

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Direct password comparison 
    if (password !== user.password) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const userResponse = {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server Error during login" });
  }
};
