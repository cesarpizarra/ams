const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/timein", attendanceController.recordTimeIn);
router.post("/timeout", attendanceController.recordTimeOut);
router.get(
  "/student/:studentId",
  verifyToken,
  attendanceController.getAttendanceRecordsForStudent
);
router.delete(
  "/delete/:studentId",
  verifyToken,
  attendanceController.deleteAllRecordsForStudent
);

module.exports = router;
