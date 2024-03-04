const mongoose = require('mongoose');
require('dotenv').config()
const mongoURL = process.env.MONGO_LOCAL_URL

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("mongodb server is connected");
})

db.on('disconnected', ()=>{
    console.log("mongodb server disconnected");
})

db.on('error', (err)=>{
    console.log("connection error in mongodb", err)
})

module.exports = db