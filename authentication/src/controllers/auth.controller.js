const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

function createToken(userId) {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

function sanitizeUser(user) {
    return {
        _id: user._id,
        username: user.username,
        email: user.email
    }
}

async function registerUser(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.create({
        username,
        email,
        password
    })

    const token = createToken(user._id)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    })

    res.status(201).json({
        message: "user registered successfully",
        user: sanitizeUser(user)
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = createToken(user._id)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    })

    res.json({
        message: "Logged in successfully",
        user: sanitizeUser(user)
    })
}

function logoutUser(req, res) {
    res.clearCookie("token", { path: "/" })
    res.json({ message: "Logged out successfully" })
}

module.exports = { registerUser, loginUser, logoutUser }