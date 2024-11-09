const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const signupRoute = require("./auth/signup");
const loginRoute = require("./auth/login");
const profileRoute = require("./auth/profile");
const jobRoutes = require("./JobRoute/job");

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

const app = express();
const PORT = 8080;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send({ message: "Forbidden" });
  }
};

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/signup", signupRoute(db));
app.use("/login", loginRoute(db));
app.use("/profile", isAuthenticated, profileRoute(db));
app.use("/jobs", jobRoutes(db));

app.get("/check-auth", isAuthenticated, (req, res) => {
  res.status(200).send({ message: "User is authenticated" });
});

app.get("/check-employer", isAuthenticated, (req, res) => {
  const userId = req.user.userId;
  if (!userId) 
    return res.status(400).send({ error: "User ID not found" });

  db.query("SELECT * FROM Employer WHERE employer_id = ?", [userId], (err, results) => {
    if (err) {
      console.error("Error checking employer status:", err);
      return res.status(500).json({ error: "Error checking employer status" });
    }
    res.json({ isEmployer: results.length > 0 });
  });
});

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
