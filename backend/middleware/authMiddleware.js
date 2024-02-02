const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user has the required permissions based on grade and section
    if (
      decoded.role === "admin" ||
      decoded.role === "teacher" ||
      (req.body.grade &&
        req.body.section &&
        decoded.grade === req.body.grade &&
        decoded.section === req.body.section)
    ) {
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  });
};

module.exports = verifyToken;
