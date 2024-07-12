const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  attendance: [
    {
      date: { type: String },
      timeIn: { type: String },
      timeOut: { type: String },
      status: { type: String },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
