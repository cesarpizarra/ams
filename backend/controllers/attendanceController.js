const Attendance = require("../models/attendance");

exports.recordTimeIn = async (req, res) => {
  try {
    const { studentId, scannedData } = req.body;
    const currentTime = new Date();

    // Save the time in record to the database
    const attendanceRecord = new Attendance({
      studentId,
      timeIn: currentTime,
      date: currentTime.toISOString().slice(0, 10),
      status: "Present",
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
    const { studentId, scannedData } = req.body;
    const currentTime = new Date();

    // Find the latest attendance record for the student and update the time out field
    const latestRecord = await Attendance.findOne({ studentId }).sort({
      date: -1,
    });

    if (latestRecord && !latestRecord.timeOut) {
      latestRecord.timeOut = currentTime;
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

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, scannedData, status } = req.body;

    // Find the latest attendance record for the student and update the status field
    const latestRecord = await Attendance.findOne({ studentId }).sort({
      date: -1,
    });

    if (latestRecord) {
      latestRecord.status = status;
      await latestRecord.save();
      res.status(200).json({ message: "Attendance marked successfully" });
    } else {
      res
        .status(400)
        .json({ message: "No attendance record found for the student" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
