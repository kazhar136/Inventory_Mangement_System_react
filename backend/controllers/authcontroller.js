const bcrypt = require('bcrypt');
const usermodel = require("../models/user");
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    try{
        const {name, email, password } = req.body;
        const user = await usermodel.findOne({ email });
        if (user){
            return res.status(409)
                .json({message: 'user is already exist, you can login', success: false});
        }
        const newusermodel = new usermodel({name, email, password });
        newusermodel.password = await bcrypt.hash(password, 10);
        await newusermodel.save();
        res.status(201)
            .json({
                message: 'signup successfully',
                success: true
            })

    } catch(err){
        res.status(500)
            .json({
                message: 'internal server error',
                success: false
            })

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email }).select('+password'); // ✅ Select password explicitly

        if (!user) {
            return res.status(403).json({ message: "Auth failed, email or password is wrong", success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: "Auth failed, email or password is wrong", success: false });
        }

        // ✅ Optimize JWT Token Generation
        const jwToken = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            token: jwToken,
            user: { email: user.email, name: user.name }
        });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};



module.exports = {
    signup,
    login
}