const Student = require("../models/student");
const Attendance = require("../models/attendance");
exports.recordTimeIn = async (req, res) => {
  try {
    const { studentId } = req.body;
    const currentTime = new Date();

    // Save the time in record to the database
    const attendanceRecord = new Attendance({
      studentId,
      timeIn: currentTime,
      date: currentTime.toISOString().slice(0, 10),
      status: "Present",
    });

    // Find the student details based on studentId
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // You can now access student details like student.name, student.rollNumber, etc.

    await attendanceRecord.save();

    res.status(201).json({ message: "Time in recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.recordTimeOut = async (req, res) => {
  try {
    const { studentId } = req.body;
    const currentTime = new Date();

    // Find the latest attendance record for the student and update the time out field
    const latestRecord = await Attendance.findOne({ studentId }).sort({
      date: -1,
    });

    if (latestRecord && !latestRecord.timeOut) {
      latestRecord.timeOut = currentTime;

      // Find the student details based on studentId
      const student = await Student.findOne({ _id: studentId });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // You can now access student details like student.name, student.rollNumber, etc.

      await latestRecord.save();
      res.status(200).json({ message: "Time out recorded successfully" });
    } else {
      res.status(400).json({ message: "No time in recorded for the student" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAttendanceRecordsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the specified student
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find all attendance records for the specified student
    const attendanceRecords = await Attendance.find({ studentId });

    if (!attendanceRecords) {
      return res
        .status(404)
        .json({ message: "No attendance records found for this student" });
    }

    // Combine student information and attendance records in the response
    const response = {
      student: {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
      },
      attendanceRecords,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
