const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  grade: Number,
  section: Number,
});

module.exports = mongoose.model("Student", studentSchema);
