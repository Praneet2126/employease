// EditProfile.js
import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data submitted:", profileData);
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title mt-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form shadow p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="profile_id">Profile ID</label>
          <input
            type="text"
            className="form-control"
            id="profile_id"
            name="profile_id"
            value={profileData.profile_id}
            onChange={handleChange}
          />
        </div>
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
          <label htmlFor="bio">Biography</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            rows="3"
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
          <label htmlFor="street">Street Address</label>
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
        <div className="form-group mb-4">
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
