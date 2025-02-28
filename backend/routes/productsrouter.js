const router = require('express').Router();
const ensureAuthenticated = require("../middlewares/auth")

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        console.log('✅ Logged user:', req.user);
        const products = [
            { name: "mobile", price: 10000 },
            { name: "tv", price: 4000 }
        ];
        res.status(200).json({ success: true, products });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
});


module.exports = router;
