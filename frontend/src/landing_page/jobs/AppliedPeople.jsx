// AppliedPeople.js
import React, { useEffect, useState } from "react";
import "./AppliedPeople.css"; // Ensure this file is created for custom styles
import HireButton from "./HireButton";

function AppliedPeople({ jobId }) {
  const [appliedPeople, setAppliedPeople] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAppliedPeople = async () => {
      try {
        const response = await fetch(`http://localhost:8080/jobs/applied-people/${jobId}`, {
            method: "GET",
            credentials: "include"
        });
        console.log(response.body);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAppliedPeople(data);
      } catch (error) {
        console.error("Error fetching applied people:", error);
        setError(error.message);
      }
    };

    fetchAppliedPeople();
  }, [jobId]);

  return (
    <div className="applied-people-container">
      <h2 className="fs-3 mb-4" style={{ textAlign: "center" }}>Applicants</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : appliedPeople.length > 0 ? (
        appliedPeople.map((person) => (
          <div key={person.jobseeker_id} className="applicant-card" style={{display: "flex", justifyContent: "space-between"} }>
            <h6>
              {person.jobseeker_id}
            </h6>
            <HireButton />
          </div>
        ))
      ) : (
        <p>No applicants yet for this job.</p>
      )}
    </div>
  );
}

export default AppliedPeople;
