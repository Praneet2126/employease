const express = require("express");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
    const router = express.Router();
    const upload = multer({
        limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
    }); // This keeps the file in memory

    router.post("/", upload.single("file"), (req, res) => {
        const { jobId } = req.body;
        const resumeFile = req.file;
        const token = req.cookies ? req.cookies.token : null;

        console.log("first line");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            const jobseekerId = decoded.userId;
            const resumeId = uuidv4();
            const submissionDate = new Date().toISOString().split("T")[0];

            db.query(
                "INSERT INTO jobseeker_search_job (job_id, jobseeker_id) VALUES (?, ?)",
                [jobId, jobseekerId],
                (err) => {
                    if (err) {
                        console.error("Error saving application in jobseeker_search_job:", err);
                        return res.status(500).json({ message: "Error saving application in jobseeker_search_job.", error: err.message });
                    }

                    console.log("Second line");

                    db.query(
                        "INSERT INTO Resume (resume_id, jobseeker_id, filename, submission_date) VALUES (?, ?, ?, ?)",
                        [resumeId, jobseekerId, resumeFile.buffer, submissionDate],
                        (err) => {
                            if (err) {
                                console.error("Error saving resume:", err);
                                return res.status(500).json({ message: "Error saving resume.", error: err.message });
                            }

                            // Update the number of applicants for the job
                            db.query(
                                "UPDATE job SET num_applicants = num_applicants + 1 WHERE job_id = ?",
                                [jobId],
                                (err) => {
                                    if (err) {
                                        console.error("Error updating applicant count:", err);
                                        return res.status(500).json({ message: "Error updating applicant count", error: err.message });
                                    }

                                    // Fetch the updated number of applicants
                                    db.query(
                                        "SELECT num_applicants FROM job WHERE job_id = ?",
                                        [jobId],
                                        (err, result) => {
                                            if (err) {
                                                console.error("Error fetching updated applicant count:", err);
                                                return res.status(500).json({ message: "Error fetching updated applicant count", error: err.message });
                                            }

                                            // Send the updated applicant count back to the frontend
                                            res.status(201).json({
                                                message: "Application submitted successfully.",
                                                num_applicants: result[0].num_applicants,
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
                    console.log("third line");
                }
            );
        });
    });

    return router;
};
