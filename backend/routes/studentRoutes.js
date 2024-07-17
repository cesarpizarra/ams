const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware");

// Registration route
router.post("/add", verifyToken, studentController.addStudent);
router.get("/all/students", verifyToken, studentController.geAllStudents);
router.put("/update-grades", verifyToken, studentController.updateStudentGrade);
router.put(
  "/update-section",
  verifyToken,
  studentController.updateStudentSectionById
);
router.put("/update/:id", verifyToken, studentController.updateStudent);
router.get("/students", verifyToken, studentController.getStudentsByTeacher);
router.get("/:id", verifyToken, studentController.getStudentById);
router.delete("/:id", verifyToken, studentController.deleteStudent);

module.exports = router;
