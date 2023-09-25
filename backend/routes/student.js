const express = require("express");
const router = express.Router();
const verifyToken = require("./authMiddleware");
const Student = require("../models/student");

// Track the current student ID count
let currentStudentIdCount = 1;

// Route to add a student
router.post("/:grade/:section/add", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can add students" });
    }

    let studentId;
    let isUniqueId = false;

    // Generate a unique student ID
    while (!isUniqueId) {
      const paddedId = String(currentStudentIdCount).padStart(3, "0");
      studentId = `000-${req.params.grade}-${req.params.section}-${paddedId}`;

      const existingStudent = await Student.findOne({ studentId });

      if (!existingStudent) {
        isUniqueId = true;
      } else {
        // If the generated ID already exists, increment the counter and try again
        currentStudentIdCount++;
      }
    }

    // Create a new student
    const student = new Student({
      studentId,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      grade: req.params.grade,
      section: req.params.section,
    });

    await student.save();

    // Increment the student ID count for the next student
    currentStudentIdCount++;

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Student addition failed" });
  }
});

// Route to retrieve a list of students for a specific grade and section
router.get("/:grade/:section/students", verifyToken, async (req, res) => {
  try {
    if (
      req.user.role === "teacher" &&
      req.user.grade.includes(parseInt(req.params.grade)) &&
      req.user.section.includes(parseInt(req.params.section))
    ) {
      // Retrieve students for the requested grade and section
      const students = await Student.find({
        grade: req.params.grade,
        section: req.params.section,
      });

      res.json(students);
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Route to update a student by ID, grade, and section
// router.put(
//   "/:grade/:section/update/:studentId",
//   verifyToken,
//   async (req, res) => {
//     try {
//       if (req.user.role !== "teacher") {
//         return res
//           .status(403)
//           .json({ message: "Only teachers can update students" });
//       }

//       // Find the student based on grade, section, and student ID
//       const student = await Student.findOne({
//         _id: req.params.studentId,
//         grade: req.params.grade,
//         section: req.params.section,
//       });

//       if (!student) {
//         return res.status(404).json({ message: "Student not found" });
//       }

//       // Update student information
//       student.firstName = req.body.firstName || student.firstName;
//       student.middleName = req.body.middleName || student.middleName;
//       student.lastName = req.body.lastName || student.lastName;

//       await student.save();

//       res.status(200).json({ message: "Student updated successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Student update failed" });
//     }
//   }
// );

// Add a new route to delete a student by ID, grade, and section
router.delete(
  "/:grade/:section/delete/:studentId",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Only teachers can delete students" });
      }

      // Find and delete the student based on grade, section, and student ID
      const deletedStudent = await Student.findOneAndDelete({
        studentId: req.params.studentId,
        grade: req.params.grade,
        section: req.params.section,
      });

      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Student deletion failed" });
    }
  }
);

module.exports = router;
