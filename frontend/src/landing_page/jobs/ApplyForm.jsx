import React, { useState } from "react";

function ApplyForm({ jobId }) {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", name);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/apply", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setError(data.message || "Failed to submit application.");
      } else {
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container my-5 p-4 border rounded bg-light">
      <h3 className="text-center mb-4">Apply For Job</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume</label>
          <input
            type="file"
            id="resume"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {error && <div className="text-danger my-2">{error}</div>}
        <button type="submit" className="btn btn-primary mt-3">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default ApplyForm;
