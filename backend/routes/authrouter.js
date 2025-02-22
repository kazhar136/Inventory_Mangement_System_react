const express = require('express');
const router = express.Router(); // ✅ Correct way to initialize the router
const User = require('../models/user'); // Adjust path as needed
const { signupvalidation, loginpvalidation } = require('../middlewares/authvalidation');
const { signup, login } = require('../controllers/authcontroller');
const a=1;




// Signup Route
router.post('/login', loginpvalidation, login);
router.post('/signup', signupvalidation, signup);



module.exports = router;
