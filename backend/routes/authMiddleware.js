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
        console.error("JWT verification error:", err);
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check if the teacher handles the requested grade and section
      if (
        decoded.role === "teacher" ||
        decoded.grade.includes(parseInt(req.params.grade)) ||
        decoded.section.includes(parseInt(req.params.section))
      ) {
        req.user = decoded;
        next();
      } else {
        console.log("Access denied ");
        return res.status(403).json({ message: "Access denied" });
      }
    }
  );
}

module.exports = verifyToken;
