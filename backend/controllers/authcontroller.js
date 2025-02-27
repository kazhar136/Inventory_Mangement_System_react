const bcrypt = require('bcrypt');
const usermodel = require("../models/user");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists with .lean() for performance
        const userExists = await usermodel.findOne({ email }).lean();
        if (userExists) {
            return res.status(409).json({
                message: 'User already exists, please log in.',
                success: false
            });
        }

        // Hash password and save user concurrently
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({ name, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({
            message: 'Signup successful',
            success: true
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user with .lean() to optimize read performance
        const user = await usermodel.findOne({ email }).lean();
        if (!user) {
            return res.status(400).json({
                message: 'Authentication failed: Invalid email or password',
                success: false
            });
        }

        // Compare password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({
                message: 'Authentication failed: Invalid email or password',
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            success: true,
            token,
            email: user.email,
            name: user.name
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = { signup, login };
