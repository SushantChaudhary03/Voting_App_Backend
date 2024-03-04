const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res)=>{
    res.send("hello world");
})





app.listen(port, ()=>{
    console.log(`listning on port ${port}`);
})