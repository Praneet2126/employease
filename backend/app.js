const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const signupRoute = require('./signup');
const loginRoute = require("./login");

const app = express();
const PORT = 8080;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/signup', signupRoute(db));
app.use('/login',loginRoute(db));

app.get("/", (req, res) => {
    res.send("Homepage");
});

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});
