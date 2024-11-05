const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (db) => {
    router.post('/', async (req, res) => {
        try {
            const { email, username, password } = req.body;

            db.query(
                'SELECT * FROM Person WHERE person_id = ?',
                [email],
                async (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: "Database error" });
                    }
                    if (results.length > 0) {
                        return res.status(409).json({ message: "User already exists" });
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    db.query(
                        'INSERT INTO Person (person_id, username, password) VALUES (?, ?, ?)',
                        [email, username, hashedPassword],
                        (err) => {
                            if (err) {
                                return res.status(500).json({ error: "Database error" });
                            }

                            const token = jwt.sign({ userId: email }, SECRET_KEY, { expiresIn: "1h" });

                            res.cookie("token", token, {
                                withCredentials: true,
                                httpOnly: true,
                            });

                            res.status(201).json({ message: "User signed up successfully", success: true });
                        }
                    );
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    return router;
};
