const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/timein", attendanceController.recordTimeIn);
router.post("/timeout", attendanceController.recordTimeOut);
router.get(
  "/student/:studentId",
  attendanceController.getAttendanceRecordsForStudent
);
router.delete(
  "/delete-all/:studentId",
  attendanceController.deleteAllAttendanceRecords
);

module.exports = router;
