const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    ref: "Student",
  },
  date: { type: String },
  timeIn: { type: String },
  timeOut: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
