// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Registration route
router.post("/register", userController.register);

// Login route
router.post("/login", userController.login);

// Update the password
router.post("/update-password", userController.updatePassword);

module.exports = router;
