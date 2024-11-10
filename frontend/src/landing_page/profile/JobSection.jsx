import React from "react";
import "./JobSection.css";
import jobsecdata from "../../data/jobsec";

function JobSection() {
  return (
    <>
      <h1 className="fs-3 mb-5" style={{ textAlign: "center" }}>
        Applied jobs
      </h1>
      <div className="container jobsec-container">
        {jobsecdata.map((job) => (
          <div
            key={job.job_id}
            className="card job-card"
            style={{ width: "18rem"}}
          >
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {job.description}
              </h6>
              <p className="card-text"><b>Location :&nbsp;</b> {job.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default JobSection;
