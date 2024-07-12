const Student = require("../models/student");

// add a student
const addStudent = async (req, res) => {
  try {
    const teacherGrade = req.user.grade;
    const teacherSection = req.user.section;

    const { lrn, firstName, middleName, lastName, grade, section } = req.body;

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      // If not admin, check if the teacher is adding a student to their own grade and section
      if (grade !== teacherGrade || section !== teacherSection) {
        return res.status(403).json({
          message:
            "Teachers can only add students to their own grade and section",
        });
      }

      // Check if grade and section are provided
      if (!grade || !section) {
        return res
          .status(400)
          .json({ message: "Grade and section are required" });
      }
    }

    // Create a new student
    const student = new Student({
      lrn,
      firstName,
      middleName,
      lastName,
      grade,
      section,
    });

    await student.save();

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
    const id = req.params.id;
    // Retrieve the student by studentId and ensure it belongs to the teacher
    const student = await Student.findById(id);

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
    const id = req.parmas.id;

    // Delete the student by studentId and ensure it belongs to the teacher
    const deletedStudent = await Student.findOneAndDelete(id);

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
    const id = req.params.id;
    const { firstName, middleName, lastName, grade, section } = req.body;

    // Check if grade and section are provided
    if (!grade || !section) {
      return res
        .status(400)
        .json({ message: "Grade and section are required" });
    }

    // Find the student by studentId
    let student = await Student.findById(id);

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

// Controller function to update student grades
const updateStudentGrade = async (req, res) => {
  const { currentGrade, targetGrade } = req.body;

  try {
    const filter = { grade: currentGrade };
    const update = { grade: targetGrade };

    // Update all students matching the currentGrade to targetGrade
    const updateResult = await Student.updateMany(filter, update);

    res.status(200).json({
      success: true,
      message: `Updated ${updateResult.nModified} students from grade ${currentGrade} to grade ${targetGrade}`,
    });
  } catch (error) {
    console.error("Error updating grades:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student grades",
      error: error.message,
    });
  }
};

// Controller function to update student sections by _id
const updateStudentSectionById = async (req, res) => {
  const { studentIds, targetSection } = req.body;

  try {
    // Update all students matching the _ids to targetSection
    await Student.updateMany(
      { _id: { $in: studentIds } },
      { section: targetSection }
    );

    res.status(200).json({
      success: true,
      message: "Updated success",
    });
  } catch (error) {
    console.error("Error updating sections:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update student sections",
      error: error.message,
    });
  }
};
module.exports = {
  addStudent,
  getStudentsByTeacher,
  getStudentById,
  deleteStudent,
  geAllStudents,
  updateStudent,
  updateStudentGrade,
  updateStudentSectionById,
};
