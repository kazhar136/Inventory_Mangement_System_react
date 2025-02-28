const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
 mongoose.connect(mongo_url)
    .then(()=>{
        console.log('Mongo_db connected')
    }).catch((err)=>{
        console.log('Mongo_DB Connection Error',err);
    })