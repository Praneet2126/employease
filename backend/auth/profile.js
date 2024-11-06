const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
        const token = req.cookies ? req.cookies.token : null;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const userId = decoded.userId;

            db.query(
                'SELECT * FROM Person WHERE person_id = ?',
                [userId],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ error: "Database error" });
                    }

                    if (results.length === 0) {
                        return res.status(404).json({ message: "No user data found" });
                    }

                    const user = results[0];

                    db.query(
                        'SELECT * FROM Profile WHERE profile_id = ?',
                        [userId],
                        (err, profileResults) => {
                            if (err) {
                                return res.status(500).json({ error: "Database error" });
                            }

                            const profile = profileResults.length > 0 ? profileResults[0] : null;

                            if (profile && profile.DOB) {
                                const formattedDOB = profile.DOB instanceof Date
                                    ? profile.DOB.toISOString().split("T")[0]
                                    : profile.DOB.split("T")[0];

                                profile.DOB = formattedDOB;
                            }

                            res.status(200).json({ user, profile });
                        }
                    );
                }
            );
        });
    });

    router.put('/update', (req, res) => {
        const { profile_id, exp, bio, skills, street, city, pincode, DOB } = req.body;

        const formattedDOB = DOB ? DOB : null;

        db.query(
            'UPDATE Profile SET exp = ?, bio = ?, skills = ?, street = ?, city = ?, pincode = ?, DOB = ? WHERE profile_id = ?',
            [exp, bio, skills, street, city, pincode, formattedDOB, profile_id],
            (err, result) => {
                if (err) {
                    console.error("Failed to update profile:", err);
                    return res.status(500).json({ message: "Failed to update profile" });
                }
                res.status(200).json({ message: "Profile updated successfully" });
            }
        );
    });

    return router;
};
