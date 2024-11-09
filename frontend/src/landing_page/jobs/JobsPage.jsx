import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Job.css";

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false); // New state for employer status
  const [searchQuery, setSearchQuery] = useState("");

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
      const response = await fetch("http://localhost:8080/check-auth", { credentials: "include" });
      if (response.ok) {
        setIsAuthenticated(true);
        checkIfEmployer(); // Call to check if user is employer after authentication
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
    }
  };

  const checkIfEmployer = async () => {
    try {
      const response = await fetch("http://localhost:8080/check-employer", { credentials: "include" });
      const data = await response.json();
      setIsEmployer(data.isEmployer); // Set employer status based on response
    } catch (error) {
      console.error("Error checking employer status:", error);
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
        setAlert({ message: "Job deletion unsuccessful", type: "danger" });
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      setAlert({ message: "Job deletion unsuccessful", type: "danger" });
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="text-center mb-4 mt-4 Job-search">
        <input
          type="text"
          className="form-control"
          placeholder="Search jobs by title. (Ex: Web developer)"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ border: "2px solid grey", width: "60%", margin: "0 auto", borderRadius: "0.7rem" }}
        />
      </div>

      <div className="jobs-container p-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job.job_id} style={{ padding: "1rem" }}>
              <div className="job-card-body">
                <h5 className="job-card-title">{job.title}</h5>
                <p className="job-card-text">{job.description}</p>
                <p className="job-card-location">
                  <strong>Location:</strong> {job.location}
                </p>
                {isAuthenticated && isEmployer && (
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
          ))
        ) : (
          <p>No jobs found matching your search criteria.</p>
        )}
      </div>

      {isAuthenticated && isEmployer && (
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
