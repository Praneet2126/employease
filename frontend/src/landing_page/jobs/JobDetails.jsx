import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplyForm from "./ApplyForm";

function JobDetails() {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [applicantCount, setApplicantCount] = useState(0);
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/${job_id}`);
        const data = await response.json();
        setJob(data);
        setApplicantCount(data.num_applicants || 0);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  const handleApplyClick = () => {
    setShowApplyForm(true);
  };

  const handleApplicantCountChange = (newCount) => {
    setApplicantCount(newCount);
  };

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="job-details">
            <div className="job-title">{job.title}</div>
            <div className="company-name">{job.company}</div>
            <div className="job-description">
              <p>{job.description}</p>
            </div>

            <div>
              <p>
                <b>Required Skill Set: </b>
                {job.required_skills || "Not specified"}
              </p>
            </div>

            {/* Displaying applicant count */}
            <div>
              <p>
                <b>Number of Applicants: </b>{applicantCount}
              </p>
            </div>

            <div className="text-center mt-4">
              <button className="apply-btn" onClick={handleApplyClick}>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showApplyForm && <ApplyForm jobId={job_id} onApplicantCountChange={handleApplicantCountChange} />}
    </div>
  );
}

export default JobDetails;
