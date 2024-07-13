const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/timein", attendanceController.recordTimeIn);
router.post("/timeout", attendanceController.recordTimeOut);
router.get(
  "/student/:lrn",
  verifyToken,
  attendanceController.getAttendanceRecordsForStudent
);
router.delete(
  "/delete/:id",
  verifyToken,
  attendanceController.deleteAllRecordsForStudent
);

module.exports = router;
