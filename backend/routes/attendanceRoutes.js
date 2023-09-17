const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/timein", attendanceController.recordTimeIn);
router.post("/timeout", attendanceController.recordTimeOut);
router.post("/mark", attendanceController.markAttendance);

module.exports = router;
