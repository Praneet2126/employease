const express = require("express");
const { v4: uuidv4 } = require("uuid");

// Example function to get job details including applicant count
function getJobDetails(jobId) {
  db.query("SELECT title, description, location, get_applicant_count(job_id) AS num_applicants FROM job WHERE job_id = ?", [jobId], function(err, result) {
      if (err) {
          console.error("Error retrieving job details:", err);
          return;
      }
      console.log("Job details:", result);
      console.log("Number of applicants:", result[0].num_applicants);
  });
}


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

  router.get("/applied-jobs/:jobseeker_id", async (req, res) => {
    const { jobseeker_id } = req.params;
    console.log(jobseeker_id)

    try {
      const query = `
        SELECT 
            j.job_id, 
            j.title, 
            j.description, 
            j.location
        FROM 
            Job j
        INNER JOIN 
            jobseeker_search_job jsj ON j.job_id = jsj.job_id
        WHERE 
            jsj.jobseeker_id = ?;
      `;
      
      const [rows] = await db.promise().query(query, [jobseeker_id]);
      res.json(rows); // Send job data as JSON response
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
      res.status(500).json({ error: "Error retrieving applied jobs." });
    }
  });
  

  return router;
};
