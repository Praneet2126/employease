import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const [profileData, setProfileData] = useState({
    profile_id: "",
    exp: "",
    bio: "",
    skills: "",
    street: "",
    city: "",
    pincode: "",
    DOB: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:8080/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();

        if (data.profile) {
          console.log('Received Profile Data:', data.profile);
          setProfileData(data.profile); // Set profile data to state
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile data", error);
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.DOB) {
      alert("Please select a valid date of birth.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      navigate("/profile");
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title mt-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form shadow p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="exp">Experience</label>
          <input
            type="text"
            className="form-control"
            id="exp"
            name="exp"
            value={profileData.exp}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bio">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            className="form-control"
            id="skills"
            name="skills"
            value={profileData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={profileData.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={profileData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            value={profileData.pincode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="DOB">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="DOB"
            name="DOB"
            value={profileData.DOB}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
