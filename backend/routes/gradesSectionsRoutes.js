const express = require("express");
const router = express.Router();

// Mock data for available grades and sections
const availableGrades = [7, 8, 9, 10, 11, 12];
const availableSections = [1, 2];

// Route to fetch available grades and sections
router.get("/grades-and-sections", (req, res) => {
  res
    .status(200)
    .json({ grades: availableGrades, sections: availableSections });
});

module.exports = router;
