const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (db) => {
    router.post('/', async (req, res) => {
        const { email, password, isEmployer } = req.body;

        db.query(
            'SELECT * FROM Person WHERE person_id = ?',
            [email],
            async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: "Database error" });
                }
                if (results.length === 0) {
                    return res.status(401).json({ message: "User does not exist" });
                }

                const user = results[0];

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Incorrect password" });
                }

                if (isEmployer) {
                    // Employer login flow
                    db.query(
                        'SELECT * FROM Employer WHERE employer_id = ?',
                        [email],
                        (err, results) => {
                            if (err) {
                                return res.status(500).json({ error: "Database error" });
                            }
                            if (results.length === 0) {
                                return res.status(403).json({ message: "You are not registered as an employer" });
                            }

                            const token = jwt.sign({ userId: email, role: "employer" }, SECRET_KEY, { expiresIn: "1h" });
                            res.cookie("token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: "Strict",
                                maxAge: 3600000
                            });

                            return res.status(200).json({ message: "Employer login successful", success: true });
                        }
                    );
                } else {
                    // User login flow (non-employer)
                    db.query(
                        'SELECT * FROM Jobseeker WHERE jobseeker_id = ?',
                        [email],
                        (err, results) => {
                            if (err) {
                                return res.status(500).json({ error: "Database error" });
                            }
                            if (results.length === 0) {
                                // Insert into Jobseeker table if not already present
                                db.query(
                                    'INSERT INTO Jobseeker (jobseeker_id, person_id, results_id) VALUES (?, NULL, NULL)',
                                    [email],
                                    (err) => {
                                        if (err) {
                                            return res.status(500).json({ error: "Failed to add to Jobseeker" });
                                        }
                                    }
                                );
                            }

                            const token = jwt.sign({ userId: email, role: "user" }, SECRET_KEY, { expiresIn: "1h" });
                            res.cookie("token", token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === "production",
                                sameSite: "Strict",
                                maxAge: 3600000
                            });

                            return res.status(200).json({ message: "User login successful", success: true });
                        }
                    );
                }
            }
        );
    });

    return router;
};
