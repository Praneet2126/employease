import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Job.css";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchJobs();
    checkAuthentication();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8080/jobs", { credentials: "include" });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const checkAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:8080/check-auth", {
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  const handleDelete = async (job_id) => {
    try {
      const response = await fetch(`http://localhost:8080/jobs/${job_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.job_id !== job_id));
        setAlert({ message: "Job deletion successful!", type: "success" });
      } else {
        console.error("Failed to delete job");
        setAlert({ message: "Job deletion unsuccessful", type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      setAlert({ message: "Job deletion unsuccessful", type: "danger" });
    }
  };

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <>
      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert" style={{ textAlign: "center" }}>
          {alert.message}
        </div>
      )}

      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Jobs open for you!</h2>

      <div className="jobs-container p-5">
        {jobs.map((job) => (
          <div className="job-card" key={job.job_id} style={{ padding: "1rem" }}>
            <div className="job-card-body">
              <h5 className="job-card-title">{job.title}</h5>
              <p className="job-card-text">{job.description}</p>
              <p className="job-card-location">
                <strong>Location:</strong> {job.location}
              </p>
              {isAuthenticated && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(job.job_id)}
                  style={{ marginTop: "0.5rem" }}
                >
                  Delete Job
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAuthenticated && (
        <div className="text-center mb-4">
          <Link to="/create-job" className="btn btn-primary">
            Create Jobs
          </Link>
        </div>
      )}
    </>
  );
}

export default JobPage;
