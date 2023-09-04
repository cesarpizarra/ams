const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  grade: Number,
  section: Number,
});

module.exports = mongoose.model("Student", studentSchema);
