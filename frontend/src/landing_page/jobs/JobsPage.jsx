import React from "react";
import jobs from "../../data/jobs";
import "./Job.css";

function JobsPage() {
  return (
    <>
    <h2 style={{textAlign: "center", marginTop: "1rem"}}>Jobs open for you!</h2>
    <div className="jobs-container p-5">
      {jobs.map(job => (
        <div className="job-card" key={job.job_id} style={{padding:"1rem"}}>
          {/* Uncomment the image line if you have an image source */}
          {/* <img className="job-card-img" src={job.image || "https://via.placeholder.com/150"} alt={`${job.title} image`} /> */}
          <div className="job-card-body">
            <h5 className="job-card-title">{job.title}</h5>
            <p className="job-card-text">{job.description}</p>
            <p className="job-card-location"><strong>Location:</strong> {job.location}</p>
            <button className="btn btn-primary" style={{borderRadius:"10px"}}>Apply</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default JobsPage;
