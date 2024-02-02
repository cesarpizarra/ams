// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware");

// Registration route
router.post("/add", verifyToken, studentController.addStudent);
router.get("/students", verifyToken, studentController.getStudentsByTeacher);
router.get("/:studentId", verifyToken, studentController.getStudentById);
router.delete("/:studentId", verifyToken, studentController.deleteStudent);

module.exports = router;
