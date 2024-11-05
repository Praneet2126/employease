const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

module.exports = (db) => {
    router.post('/', async (req, res) => {
        try {
            const { email, password } = req.body;

            db.query(
                'SELECT * FROM Person WHERE person_id = ?',
                [email],
                async (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: "Database error" });
                    }
                    if (results.length === 0) {
                        return res.status(401).json({ message: "Incorrect email or password" });
                    }

                    const user = results[0];
                    
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return res.status(401).json({ message: "Incorrect email or password" });
                    }

                    const token = jwt.sign({ userId: user.person_id }, SECRET_KEY, { expiresIn: "1h" });
                    console.log(token);
                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production", 
                        sameSite: "Strict", 
                        maxAge: 3600000
                    });

                    res.status(200).json({ message: "User logged in successfully", success: true });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    return router;
};
