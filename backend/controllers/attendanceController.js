const Student = require("../models/student");
const Attendance = require("../models/attendance");
// http://localhost:3000/api/attendance/timein
const recordTimeIn = async (req, res) => {
  try {
    const { lrn } = req.body;
    const currentTime = new Date();
    const currentDate = currentTime.toLocaleDateString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Find the student details based on lrn
    const student = await Student.findOne({ lrn });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      lrn,
      date: currentDate,
    });

    if (!latestRecord) {
      // If no record exists for today, create a new one with timeIn
      const newRecord = new Attendance({
        lrn,
        timeIn: currentTime,
        date: currentDate,
        status: "Half Day", // Initially set as Half Day
      });

      await newRecord.save();
      return res.status(201).json({ message: "Time in recorded successfully" });
    }

    // Check if timeIn is already set
    if (!latestRecord.timeIn) {
      // Update the latest attendance record with the time in
      latestRecord.timeIn = currentTime;
      latestRecord.status = "Present"; // Set status to Present when timing in
      await latestRecord.save();

      res.status(201).json({ message: "Time in recorded successfully" });
    } else {
      // Time in is already recorded
      res.status(400).json({ message: "Student is already timed in" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const recordTimeOut = async (req, res) => {
  try {
    const { lrn } = req.body;
    const currentTime = new Date();
    const currentDate = currentTime.toLocaleDateString("en-US", {
      timeZone: "Asia/Manila",
    });

    // Find the student details based on lrn
    const student = await Student.findOne({ lrn });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the latest attendance record for the student for the current day
    const latestRecord = await Attendance.findOne({
      lrn,
      date: currentDate,
    });

    if (!latestRecord) {
      // If no record exists for today, create a new one with timeOut
      const newRecord = new Attendance({
        lrn,
        timeOut: currentTime,
        date: currentDate,
        status: "Half Day", // Initially set as Half Day when timing out directly
      });

      await newRecord.save();
      return res
        .status(201)
        .json({ message: "Time out recorded successfully" });
    }

    // Check if timeOut is already set
    if (!latestRecord.timeOut) {
      // Update the latest attendance record with the time out
      latestRecord.timeOut = currentTime;
      latestRecord.status = "Present"; // Set status to Present when timing out
      await latestRecord.save();

      res.status(201).json({ message: "Time out recorded successfully" });
    } else {
      // Time out is already recorded
      res.status(400).json({ message: "Student is already timed out" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAttendanceRecordsForStudent = async (req, res) => {
  try {
    const { lrn } = req.params;
    // Find the student details based on lrn
    const student = await Student.findOne({ lrn: lrn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find all attendance records for the student
    const attendanceRecords = await Attendance.find({ lrn: student.lrn });

    res.status(200).json({ student, attendanceRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAllRecordsForStudent = async (req, res) => {
  try {
    const lrn = req.params.lrn;
    // Find the student details based on id
    const student = await Student.findOne({ lrn: lrn });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete all attendance records for the student
    await Attendance.deleteMany({ lrn: lrn });

    res
      .status(200)
      .json({ message: "All attendance records deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all attendance
const getAllAttendance = async (req, res) => {
  try {
    const users = await Attendance.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to retrieve attendance", error: error.message });
  }
};

module.exports = {
  recordTimeIn,
  recordTimeOut,
  getAttendanceRecordsForStudent,
  deleteAllRecordsForStudent,
  getAllAttendance,
};
