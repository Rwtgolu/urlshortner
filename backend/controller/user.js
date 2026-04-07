const user = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const JWT_SECRET = process.env.JWT_SECRET 

async function handleusersignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        await user.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.json({ message: "User created successfully" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function handleuserlogin(req, res) {
    try {
        const { email, password } = req.body;

        const userData = await user.findOne({ email });
        if (!userData) return res.status(404).json({ error: "User not found" })

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, userData.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" })
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        return res.json({ 
            message: "Login successful",
            token,
            user: { id: userData._id, name: userData.name, email: userData.email }
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    handleusersignup,
    handleuserlogin
}