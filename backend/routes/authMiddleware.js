const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check if the teacher handles the requested grade and section
      if (
        decoded.role === "teacher" &&
        decoded.grades.includes(req.params.grade) &&
        decoded.sections.includes(req.params.section)
      ) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    }
  );
}

module.exports = verifyToken;
