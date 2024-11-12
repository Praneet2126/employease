import React, { useState, useEffect } from "react";
import "./JobSection.css";

function JobSection({ jobseeker_id }) {
  const [jobsecdata, setJobsecData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/applied-jobs/${jobseeker_id}`,{
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch jobs.");
        }
        const data = await response.json();
        setJobsecData(data);
      } catch (err) {
        setError("Error retrieving jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobseeker_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="fs-3 mb-5" style={{ textAlign: "center" }}>
        Applied jobs
      </h1>
      <div className="container jobsec-container">
        {jobsecdata.map((job) => (
          <div key={job.job_id} className="card job-card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{job.description}</h6>
              <p className="card-text"><b>Location :&nbsp;</b> {job.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JobSection;
