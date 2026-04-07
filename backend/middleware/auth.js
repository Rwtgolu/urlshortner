const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET 

function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer token

        if (!token) {
            return res.status(401).json({ error: "Token not provided" })
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        req.email = decoded.email
        next()
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}

module.exports = authMiddleware
