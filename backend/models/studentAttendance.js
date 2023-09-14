// models/studentAttendance.js
const mongoose = require("mongoose");

const studentAttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", // Reference to the Student model
    required: true,
  },
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    default: null, // Initially, timeOut can be null until marked
  },
});

module.exports = mongoose.model("StudentAttendance", studentAttendanceSchema);
