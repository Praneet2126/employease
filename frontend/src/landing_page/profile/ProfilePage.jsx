import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "./Hero.jsx";
import "./Profile.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data.user);
        setProfile(data.profile);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.clear();
        sessionStorage.clear();
        
        navigate("/login", { state: { message: "Logged out successfully!" } });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderInfo = (info) => {
    return info ? info : "Information not available";
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (
      month < birthDate.getMonth() ||
      (month === birthDate.getMonth() && day < birthDate.getDate())
    ) {
      age--;
    }

    return age < 18 ? "Invalid age (under 18)" : age;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !profile) {
    return <div>No user data found</div>;
  }

  return (
    <div className="container mt-5">
      <Hero user={user} />
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-10 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600">{renderInfo(profile.profile_id)}</h6>
                      <p>{renderInfo(profile.exp)}</p>
                      <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{renderInfo(user.person_id)}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Phone</p>
                          <h6 className="text-muted f-w-400">98979989898</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Biography</h6>
                      <p className="text-muted f-w-400">{renderInfo(profile.bio)}</p>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Skills</h6>
                      <p className="text-muted f-w-400">{renderInfo(profile.skills)}</p>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Address</h6>
                      <p className="text-muted f-w-400">
                        {renderInfo(profile.street)}, {renderInfo(profile.city)},{' '}
                        {renderInfo(profile.pincode)}
                      </p>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Date of Birth</h6>
                      <p className="text-muted f-w-400">{renderInfo(profile.DOB)}</p>

                      {profile.DOB && (
                        <>
                          <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Age</h6>
                          <p className="text-muted f-w-400">{calculateAge(profile.DOB)} years old</p>
                        </>
                      )}

                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a href="#!" data-toggle="tooltip" title="facebook">
                            <i className="mdi mdi-facebook feather icon-facebook facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" data-toggle="tooltip" title="twitter">
                            <i className="mdi mdi-twitter feather icon-twitter twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#!" data-toggle="tooltip" title="instagram">
                            <i className="mdi mdi-instagram feather icon-instagram instagram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4>
        <center>
          <Link to="/editProfile"> Edit Your Profile </Link>
        </center>
      </h4>

      <div className="text-center mt-3 mb-5">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
