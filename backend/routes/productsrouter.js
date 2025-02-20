const router = require('express').Router();
const ensureAuthenticated = require("../middlewares/auth")



router.get('/', ensureAuthenticated, (req, res) => {
    console.log('logged user details--------',req.user)
    res.status(200).json([
    { 
        name: "mobile",
        price: 10000
    },
    { 
        name: "tv",
        price: 4000
    }
    ])
});



module.exports = router;
