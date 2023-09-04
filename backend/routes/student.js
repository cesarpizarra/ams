const express = require("express");
const router = express.Router();
const verifyToken = require("./authMiddleware");
const Student = require("../models/student");

router.post("/:grade/:section/add", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can add students" });
    }

    // Create a new student
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

router.get("/:grade/:section/students", verifyToken, async (req, res) => {
  try {
    // Check if the user is a teacher and has access to the requested grade and section
    if (
      req.user.role === "teacher" &&
      req.user.grades.includes(parseInt(req.params.grade)) &&
      req.user.sections.includes(parseInt(req.params.section))
    ) {
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
