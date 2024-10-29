import React from "react";
import jobs from "../../data/jobs";

function JobsPage() {
  return (
    <div className="d-flex flex-wrap justify-content-start">
      {jobs.map(job => (
        <div className="card m-3" style={{ width: "18rem" }} key={job.job_id}>
          {/* <img className="card-img-top" src="https://via.placeholder.com/150" alt="Card image cap" /> */}
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text">{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobsPage;
