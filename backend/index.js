const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./models/db'); // Ensure this is correctly set up

const authrouter = require('./routes/authrouter'); // Import user routes
const productsrouter = require('./routes/productsrouter');

const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Use Routers
app.use('/auth', authrouter); // Base route for user-related endpoints
app.use('/products', productsrouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});