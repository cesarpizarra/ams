const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const attendanceRoutes = require("./routes/attendanceRoutes");
const gradesSectionsRoutes = require("./routes/gradesSectionsRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB".underline.cyan);
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", gradesSectionsRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

//message 404
app.use((req, res, next) => {
  res.status(404).send("Page not Found!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.underline.yellow);
});