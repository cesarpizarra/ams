const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  firstName: String,
  middleName: String,
  lastName: String,
  grade: Number,
  section: Number,
});

module.exports = mongoose.model("Student", studentSchema);
