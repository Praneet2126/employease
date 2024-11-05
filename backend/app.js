const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const signupRoute = require('./signup'); // Import the signup route

const app = express();
const PORT = 8080;

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Middleware
app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

// Use the signup route
app.use('/signup', signupRoute(db)); // Pass the db connection to the signup route

// Home Route
app.get("/", (req, res) => {
    res.send("Homepage");
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});
