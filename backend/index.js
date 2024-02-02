const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
const authRoutes = require("./routes/auth");
const attendanceRoutes = require("./routes/attendanceRoutes");
const student = require("./routes/studentRoutes");
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
app.use(cors());
// {
//   origin: "https://lnhs.vercel.app",
// }

// Routes
app.use("/api/auth", authRoutes);
app.use("/student", student);
app.use("/api/attendance", attendanceRoutes);

//message 404
app.use((req, res, next) => {
  res.status(404).send("Page not Found!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.underline.yellow);
});
