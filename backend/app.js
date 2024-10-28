const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const config = require('./config');

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.get("/",(req,res)=>{
    res.send("Homepage");
})

app.listen(8080, () => { 
    console.log("App is listening on PORT 8080");
})