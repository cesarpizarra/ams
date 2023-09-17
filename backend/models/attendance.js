const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  timeIn: { type: Date },
  timeOut: { type: Date },
  status: { type: String }, // 'Present' or 'Absent'
});

module.exports = mongoose.model("Attendance", attendanceSchema);
