const Student = require("../models/student");
const Attendance = require("../models/attendance");

const recordTimeIn = async (req, res) => {
  try {
    const { studentId } = req.body;
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 10);

    // Find the student details based on studentId
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      studentId,
      date: currentDate,
    });

    if (!latestRecord) {
      // If no record exists for today, create a new one with timeIn
      const newRecord = new Attendance({
        studentId,
        timeIn: currentTime,
        date: currentDate,
        status: "Half Day", // Initially set as Half Day
      });

      await newRecord.save();
      return res.status(201).json({ message: "Time in recorded successfully" });
    }

    // Update the latest attendance record with the time in
    latestRecord.timeIn = currentTime;
    latestRecord.status = "Present"; // Set status to Present when timing in

    await latestRecord.save();

    res.status(201).json({ message: "Time in recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const recordTimeOut = async (req, res) => {
  try {
    const { studentId } = req.body;
    const currentTime = new Date();
    const currentDate = currentTime.toISOString().slice(0, 10);

    // Find the student details based on studentId
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      studentId,
      date: currentDate,
    });

    if (!latestRecord) {
      // If no record exists for today, create a new one with timeOut
      const newRecord = new Attendance({
        studentId,
        timeOut: currentTime,
        date: currentDate,
        status: "Halfday", // Initially set as Halfday when timing out directly
      });

      await newRecord.save();
      return res
        .status(201)
        .json({ message: "Time out recorded successfully" });
    }

    // Update the latest attendance record with the time out
    latestRecord.timeOut = currentTime;
    latestRecord.status = "Present"; // Set status to Present when timing out

    await latestRecord.save();

    res.status(201).json({ message: "Time out recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAttendanceRecordsForStudent = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the student details based on studentId
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find all attendance records for the student
    const attendanceRecords = await Attendance.find({ student: id });

    res.status(200).json({ student, attendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAllRecordsForStudent = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the student details based on studentId
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete all attendance records for the student
    await Attendance.deleteMany(id);

    res
      .status(200)
      .json({ message: "All attendance records deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  recordTimeIn,
  recordTimeOut,
  getAttendanceRecordsForStudent,
  deleteAllRecordsForStudent,
};
