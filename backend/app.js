const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const config = require('./config');
const cors = require('cors');
const bodyParser = require("body-parser");

const db = mysql.createConnection(config);

app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

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