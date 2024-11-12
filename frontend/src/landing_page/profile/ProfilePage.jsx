import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "./Hero.jsx";
import "./Profile.css";
import OpenAccount from "../OpenAccount.jsx";
import JobSection from "./JobSection.jsx";
import ProfileSection from "./ProfileSection.jsx";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEmployer, setIsEmployer] = useState(false);
  const [companyName, setCompanyName] = useState(null);
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

  useEffect(() => {
    const checkEmployerStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/check-employer", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to check employer status");
        }

        const data = await response.json();
        setIsEmployer(data.isEmployer);

        if (data.isEmployer) {
          const companyResponse = await fetch(
            "http://localhost:8080/profile/get-company-name",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (companyResponse.ok) {
            const companyData = await companyResponse.json();
            setCompanyName(companyData.company_name);
          }
        }
      } catch (error) {
        console.error("Error checking employer status:", error);
      }
    };

    checkEmployerStatus();
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
    return (
      <div className="mt-5 mb-5" style={{ textAlign: "center" }}>
        <img src="media/images/no-data.png" alt="No data" />
        <h2>No Data Found</h2>
        <OpenAccount />
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 mb-5">
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
                        <h5 className="f-w-600">
                          {renderInfo(profile.profile_id)}
                        </h5>
                        <ProfileSection jobseeker_id={profile.profile_id}/>
                        <p>{renderInfo(profile.exp)}</p>
                        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                          Information
                        </h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">
                              {renderInfo(user.person_id)}
                            </h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Phone</p>
                            <h6 className="text-muted f-w-400">98979989898</h6>
                          </div>
                        </div>
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Biography
                        </h6>
                        <p className="text-muted f-w-400">
                          {renderInfo(profile.bio)}
                        </p>

                        {isEmployer ? (
                          <>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                              Company
                            </h6>
                            <p className="text-muted f-w-400">
                              {renderInfo(companyName)}
                            </p>
                          </>
                        ) : (
                          <>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                              Skills
                            </h6>
                            <p className="text-muted f-w-400">
                              {renderInfo(profile.skills)}
                            </p>
                          </>
                        )}

                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Address
                        </h6>
                        <p className="text-muted f-w-400">
                          {renderInfo(profile.street)},{" "}
                          {renderInfo(profile.city)},{" "}
                          {renderInfo(profile.pincode)}
                        </p>
                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Date of Birth
                        </h6>
                        <p className="text-muted f-w-400">
                          {renderInfo(profile.DOB)}
                        </p>

                        {profile.DOB && (
                          <>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                              Age
                            </h6>
                            <p className="text-muted f-w-400">
                              {calculateAge(profile.DOB)}
                            </p>
                          </>
                        )}
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
            <button className="btn btn-primary" style={{ padding: "10px" }}>
              <Link
                to="/editProfile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10px",
                }}
              >
                Edit Your Profile
              </Link>
            </button>
          </center>
        </h4>

        <div className="text-center mt-3 mb-5">
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
      
      {!isEmployer && (
        <div className="container mt-5">
          <hr/>
          <JobSection />
        </div>
      )}
    </>
  );
}

export default ProfilePage;
