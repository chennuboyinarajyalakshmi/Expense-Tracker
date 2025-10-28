const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const isAuthenticated = async (req, res, next) => {
  try {
    // ✅ 1. Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, access denied" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ 2. Verify token using secret from .env (no quotes)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ 3. Save the user ID to request object
    req.user = decoded.id;

    // ✅ 4. Continue to the next middleware
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }

    return res.status(401).json({ message: "Invalid token, access denied" });
  }
};

module.exports = isAuthenticated;
