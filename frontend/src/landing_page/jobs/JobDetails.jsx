import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobDetails.css";

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
    <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="job-details">
            <div class="job-title">{job.title}</div>
            <div class="company-name">{job.company}</div>   {/* Company name here*/}
            <div class="job-description">
              <p>{job.description}</p>
            </div>
            <div>
              <p><b>Required Skill Set:</b></p>
              <p>// Let it come from database </p>
            </div>
            <div class="text-center mt-4">
              <button class="apply-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}

export default JobDetails;
