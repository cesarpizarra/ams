const Student = require("../models/student");
const Attendance = require("../models/attendance");

exports.recordTimeIn = async (req, res) => {
  try {
    const { studentId } = req.body;
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 10);

    // Find the student details based on studentId
    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      studentId,
      date: currentDate,
    }).sort({ timeIn: -1 });

    // Check if a record already exists for today
    if (latestRecord && latestRecord.timeOut) {
      return res.status(400).json({
        message: "Time in already recorded for today, please record time out.",
      });
    }

    // Save the time in record for the current day
    const attendanceRecord = new Attendance({
      studentId,
      timeIn: currentTime,
      date: currentDate,
      status: "Present", // Set status to "Present" initially
    });

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
    const currentDate = currentTime.toISOString().slice(0, 10);

    // Find the student details based on studentId
    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      studentId,
      date: currentDate,
    }).sort({ timeIn: -1 });

    // Check if a record already exists for today
    if (!latestRecord || latestRecord.timeOut) {
      return res.status(400).json({
        message:
          "No time in recorded for today or time out already recorded for today",
      });
    }

    // Update the latest attendance record with the time out
    latestRecord.timeOut = currentTime;
    latestRecord.status = "Present"; // Update status to "Present" for this record

    await latestRecord.save();

    res.status(201).json({ message: "Time out recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAttendanceRecordsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId: studentId });

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

    // Calculate status for each attendance record and set it directly in the record
    attendanceRecords.forEach((record) => {
      record.status = calculateStatus(record.timeIn, record.timeOut);
    });

    res.status(200).json({
      student: {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
      },
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAllAttendanceRecords = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete all attendance records for the specified student
    await Attendance.deleteMany({ studentId });

    res
      .status(200)
      .json({ message: "All attendance records deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Helper function to calculate status based on timeIn and timeOut
const calculateStatus = (timeIn, timeOut) => {
  if (timeIn && timeOut) {
    return "Present";
  } else if (timeIn && !timeOut) {
    return "Half Day";
  } else {
    return "Absent";
  }
};
