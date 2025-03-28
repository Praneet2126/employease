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

    router.get('/get-company-name', (req, res) => {
        const token = req.cookies ? req.cookies.token : null;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const userId = decoded.userId;
            console.log("Fetching company name for employer ID:", userId);  

            db.query(
                'SELECT company_name FROM Employer WHERE employer_id = ?',
                [userId],
                (err, results) => {
                    if (err) {
                        console.error("Database error fetching company name:", err);
                        return res.status(500).json({ error: "Database error" });
                    }

                    console.log("Employer query results:", results); 
                    if (results.length === 0 || results[0].company_name === null) {
                        return res.status(404).json({ message: "Employer not found or no company name set" });
                    }

                    const companyName = results[0].company_name;
                    res.status(200).json({ company_name: companyName });
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

    router.put('/update-company-name', (req, res) => {
        const { company_name } = req.body;

        if (!company_name) {
            return res.status(400).json({ message: "Company name is required" });
        }

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
                'UPDATE Employer SET company_name = ? WHERE employer_id = ?',
                [company_name, userId],
                (err, result) => {
                    if (err) {
                        console.error("Failed to update company name:", err);
                        return res.status(500).json({ message: "Failed to update company name" });
                    }

                    if (result.affectedRows === 0) {
                        return res.status(404).json({ message: "Employer not found" });
                    }

                    res.status(200).json({ message: "Company name updated successfully" });
                }
            );
        });
    });

    router.get('/:jobseeker_id', (req, res) => {
        const jobseekerId = req.params.jobseeker_id;
        const query = `
            SELECT 
                j.jobseeker_id, 
                COUNT(jsj.job_id) AS applied_jobs_count
            FROM 
                jobseeker_search_job jsj
            JOIN 
                Jobseeker j ON jsj.jobseeker_id = j.jobseeker_id
            WHERE 
                j.jobseeker_id = ?
            GROUP BY 
                j.jobseeker_id;
        `;

        db.query(query, [jobseekerId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving job application count');
            } else {
                console.log(result);
                res.json(result);  // Send back the applied job count to the frontend
            }
        });
    });
    

    return router;
};
