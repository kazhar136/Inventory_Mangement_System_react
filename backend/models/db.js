const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // ✅ Connection pooling
};

mongoose.connect(mongo_url, options)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

module.exports = mongoose;
