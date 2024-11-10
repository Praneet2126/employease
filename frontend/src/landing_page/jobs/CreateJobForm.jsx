import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateJobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [required_skills, setRequiredSkills] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, required_skills, location }),
      });

      if (response.ok) {
        navigate("/jobs");
      } else {
        console.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Required Skill Set</label>
          <textarea
            className="form-control"
            value={required_skills}
            onChange={(e) => setRequiredSkills(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mb-5">Save Job</button>
      </form>
    </div>
  );
}

export default CreateJobForm;
