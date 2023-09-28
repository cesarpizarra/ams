const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration controller
exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const { role } = req.body;

    if (role !== "admin" && role !== "teacher") {
      return res.status(403).json({ message: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      grade: req.body.grade,
      section: req.body.section,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// User login controller
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        grade: user.grade,
        section: user.section,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Logged in Successfully",
      token,
      userId: user._id,
      grade: user.grade,
      section: user.section,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
};

// Controller method to update the password
exports.updatePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password update failed" });
  }
};
