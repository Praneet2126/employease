import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/EmployEase_logo.png"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link active" to="/signup">
                  Signup <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item ">
                <Link class="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/products">
                  Jobs
                </Link> 
              </li>
              <li class="nav-item">
                <Link class="nav-link active" to="/pricing">
                  Profile
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link active " to="/support">
                  Support
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link active " href="">
                  <i class="fa-solid fa-bars"></i>
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
