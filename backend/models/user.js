const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  grades: [{ type: Number }],
  sections: [{ type: Number }],
});

module.exports = mongoose.model("User", userSchema);
