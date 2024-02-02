const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  studentId: String,
  firstName: String,
  middleName: String,
  lastName: String,
  grade: String,
  section: String,
});

module.exports = mongoose.model("Student", studentSchema);
