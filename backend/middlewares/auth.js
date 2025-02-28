const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // ✅ Bearer Token Support
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, Token required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, Invalid token" });
    }
};

module.exports = ensureAuthenticated;