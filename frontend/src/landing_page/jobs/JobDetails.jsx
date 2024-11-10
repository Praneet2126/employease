import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/${job_id}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="job-details-container">
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
    </div>
  );
}

export default JobDetails;
