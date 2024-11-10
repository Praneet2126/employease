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
    <>
      <hr />
      <h3 className="fs-2" style={{ textAlign: "center" }}>
        Apply For Job
      </h3>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-8">
            <label htmlFor="resume">Resume</label>
            <input
              type="file"
              id="resume"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {error && <div className="col-8 text-danger mt-2">{error}</div>}
          <div className="col-8 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyForm;
