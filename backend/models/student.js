const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  lrn: String,
  firstName: String,
  middleName: String,
  lastName: String,
  grade: String,
  section: String,
});

module.exports = mongoose.model("Student", studentSchema);
