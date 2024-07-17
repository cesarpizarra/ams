const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// User registration controller
const register = async (req, res) => {
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

    // If you want to generate a token, you can include it in the response
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "yourSecretKey",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};
// User login controller
const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
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
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Logged in Successfully",
      token,
      userId: user._id,
      username: user.username,
      grade: user.grade,
      section: user.section,
      role: user.role,
    });
  } catch (error) {
    console.error("Authentication failed:", error.message);
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
};

// Update password controller
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update failed:", error.message);
    res
      .status(500)
      .json({ message: "Password update failed", error: error.message });
  }
};

const geAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

module.exports = {
  register,
  login,
  updatePassword,
  geAllUsers,
};
