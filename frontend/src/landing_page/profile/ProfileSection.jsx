import React, { useState, useEffect } from "react";

const ProfileSection = ({ jobseeker_id }) => {
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobsCount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile/${jobseeker_id}`,  {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("ProfileSection response:", data);
        setAppliedJobsCount(data[0]?.applied_jobs_count);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError("Error retrieving applied jobs count.");
        setLoading(false);
      }
    };

    fetchAppliedJobsCount();
  }, [jobseeker_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-section">
      <p>Jobseeker has applied to {appliedJobsCount} job(s).</p>
    </div>
  );
};

export default ProfileSection;
