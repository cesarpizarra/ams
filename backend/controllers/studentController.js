const Student = require("../models/student");
let currentStudentIdCount = 1;

// add a student
const addStudent = async (req, res) => {
  try {
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can add students" });
    }

    const teacherId = req.user._id;

    const teacherGrade = req.user.grade;
    const teacherSection = req.user.section;

    const { firstName, middleName, lastName, grade, section } = req.body;

    // Check if the teacher is adding a student to their own grade and section
    if (grade !== teacherGrade || section !== teacherSection) {
      return res.status(403).json({
        message:
          "Teachers can only add students to their own grade and section",
      });
    }

    if (!grade || !section) {
      return res
        .status(400)
        .json({ message: "Grade and section are required" });
    }

    // Generate a unique student ID
    const paddedId = String(currentStudentIdCount).padStart(3, "0");
    const studentId = `000-${grade}-${section}-${paddedId}`;

    // Create a new student
    const student = new Student({
      userId: teacherId,
      studentId,
      firstName,
      middleName,
      lastName,
      grade,
      section,
    });

    await student.save();

    // Increment the student ID count for the next student
    currentStudentIdCount++;

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Student addition failed", error: error.message });
  }
};
// Get students
const getStudentsByTeacher = async (req, res) => {
  try {
    // Retrieve students based on the teacher's user ID, grade, and section
    const students = await Student.find({
      userId: req.user._id,
      grade: req.user.grade,
      section: req.user.section,
    });

    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve students", error: error.message });
  }
};

// Get all students
const geAllStudents = async (req, res) => {
  try {
    const users = await Student.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve students", error: error.message });
  }
};

// Get a specific student by studentId
const getStudentById = async (req, res) => {
  try {
    const teacherId = req.user._id;

    // Retrieve the student by studentId and ensure it belongs to the teacher
    const student = await Student.findOne({
      studentId: req.params.studentId,
      userId: teacherId,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve student", error: error.message });
  }
};
// Delete a student by studentId
const deleteStudent = async (req, res) => {
  try {
    // Ensure that the user is a teacher
    if (req.user.role !== "teacher") {
      return res
        .status(403)
        .json({ message: "Only teachers can delete students" });
    }

    const teacherId = req.user._id;

    // Delete the student by studentId and ensure it belongs to the teacher
    const deletedStudent = await Student.findOneAndDelete({
      studentId: req.params.studentId,
      userId: teacherId,
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete student", error: error.message });
  }
};

// Update a student by studentId
const updateStudent = async (req, res) => {
  try {
    const { firstName, middleName, lastName, grade, section } = req.body;

    // Check if grade and section are provided
    if (!grade || !section) {
      return res
        .status(400)
        .json({ message: "Grade and section are required" });
    }

    // Find the student by studentId
    let student = await Student.findOne({
      studentId: req.params.studentId,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student fields
    student.firstName = firstName;
    student.middleName = middleName;
    student.lastName = lastName;
    student.grade = grade;
    student.section = section;

    // Save the updated student
    await student.save();

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update student", error: error.message });
  }
};
module.exports = {
  addStudent,
  getStudentsByTeacher,
  getStudentById,
  deleteStudent,
  geAllStudents,
  updateStudent,
};
