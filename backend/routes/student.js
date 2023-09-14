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
    // Create a new student
    const student = new Student({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
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

// Route to update a student by ID, grade, and section
router.put(
  "/:grade/:section/update/:studentId",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Only teachers can update students" });
      }

      // Find the student based on grade, section, and student ID
      const student = await Student.findOne({
        _id: req.params.studentId,
        grade: req.params.grade,
        section: req.params.section,
      });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Update student information
      student.firstName = req.body.firstName || student.firstName;
      student.middleName = req.body.middleName || student.middleName;
      student.lastName = req.body.lastName || student.lastName;

      await student.save();

      res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Student update failed" });
    }
  }
);

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
        _id: req.params.studentId,
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

// Route for marking attendance with time in and time out
router.post(
  "/:grade/:section/mark-attendance/:studentId",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Only teachers can mark attendance" });
      }

      // Find the student based on studentId (you may need to validate it)
      const student = await Student.findById(req.params.studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Check if the student has an open attendance record for the current date
      let attendance = await StudentAttendance.findOne({
        student: student._id,
        timeIn: {
          $gte: new Date().setHours(0, 0, 0, 0), // Today's date, 00:00:00
          $lte: new Date(), // Current date and time
        },
        timeOut: null, // An open attendance record
      });

      // If there's an open attendance record, update it with time out
      if (attendance) {
        attendance.timeOut = new Date();
      } else {
        // If no open attendance record, create a new attendance record with time in
        attendance = new StudentAttendance({
          student: student._id,
          timeIn: new Date(),
        });
      }

      await attendance.save();

      res.status(201).json({ message: "Attendance marked with time in/out" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Attendance marking failed" });
    }
  }
);

// Route for fetching attendance status for a specific student on a specific date
router.get(
  "/:grade/:section/attendance/:studentId/:date",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "teacher") {
        return res
          .status(403)
          .json({ message: "Only teachers can view attendance" });
      }

      // Find the student based on studentId (you may need to validate it)
      const student = await Student.findById(req.params.studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Convert the provided date to a Date object
      const queryDate = new Date(req.params.date);

      // Find the attendance record for the student on the specified date
      const attendance = await StudentAttendance.findOne({
        student: student._id,
        timeIn: {
          $gte: queryDate.setHours(0, 0, 0, 0), // Start of the specified date
          $lte: queryDate.setHours(23, 59, 59, 999), // End of the specified date
        },
      });

      // Determine if the student was present or absent on the specified date
      const attendanceStatus = attendance ? "Present" : "Absent";

      res.status(200).json({ attendanceStatus, attendance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Attendance retrieval failed" });
    }
  }
);

module.exports = router;
