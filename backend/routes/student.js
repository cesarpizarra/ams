const express = require("express");
const router = express.Router();
const verifyToken = require("./authMiddleware");
const Student = require("../models/student");

// Route to add a student
router.post("/:grade/:section/add", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can add students" });
    }

    const student = new Student({
      name: req.body.name,
      grade: req.params.grade,
      section: req.params.section,
    });

    await student.save();

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
      req.user.grades.includes(parseInt(req.params.grade)) &&
      req.user.sections.includes(parseInt(req.params.section))
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

module.exports = router;
