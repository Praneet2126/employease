const express = require("express");
const { v4: uuidv4 } = require("uuid");

module.exports = (db) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    db.query("SELECT * FROM job", (err, results) => {
      if (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ message: "Error fetching jobs" });
      } else {
        res.json(results);
      }
    });
  });

  router.post("/", (req, res) => {
    const { title, description, required_skills, location } = req.body;
    const job_id = uuidv4();

    const query = "INSERT INTO job (job_id, title, description, location, required_skills) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [job_id, title, description, location, required_skills], (err) => {
      if (err) {
        console.error("Error creating job:", err);
        res.status(500).json({ message: "Error creating job" });
      } else {
        res.status(201).json({ message: "Job created successfully", job_id });
      }
    });
  });

  router.get("/:job_id", (req, res) => {
    const { job_id } = req.params;
    db.query("SELECT * FROM job WHERE job_id = ?", [job_id], (err, results) => {
      if (err) {
        console.error("Error fetching job details:", err);
        res.status(500).json({ message: "Error fetching job details" });
      } else {
        res.json(results[0]);
      }
    });
  });

  router.delete("/:job_id", (req, res) => {
    const { job_id } = req.params;
    const query = "DELETE FROM job WHERE job_id = ?";
    
    db.query(query, [job_id], (err, result) => {
      if (err) {
        console.error("Error deleting job:", err);
        res.status(500).json({ message: "Error deleting job" });
      } else {
        res.status(200).json({ message: "Job deleted successfully" });
      }
    });
  });

  return router;
};
