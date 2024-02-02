const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "teacher"] },
  grade: { type: String, required: true },
  section: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
