import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container p-5 border-top">
        <div className="row p-5">
          <div className="col">
            <img
              src="media/images/EmployEase_logo.png"
              alt="Company Logo"
              style={{ width: "50%" }}
            />
            <p className="text-muted mt-2 p-1">&copy; 2024, EmployEase. All rights reserved.</p>
          </div>
          <div className="col linkStyle">
            <p>Company</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>About Us</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Jobs</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Pricing</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Referral Program</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Careers</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Blog</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Press & Media</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Community</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Contact Us</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Help Center</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>FAQs</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Terms of Service</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Privacy Policy</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Create an Account</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Login</a>
            <br />
            <a href="" className="text-muted" style={{textDecoration: "none", color: "black"}}>Employer Dashboard</a>
            <br />
          </div>
        </div>

        <div
          className="mt-2 text-small text-muted p-5"
          style={{ fontSize: "small" }}
        >
          <p>
            EmployEase is dedicated to connecting job seekers with their ideal employers. We aim to provide a seamless experience for both candidates and employers, ensuring the best opportunities are within reach.
          </p>

          <p>
            Make sure to verify any job listings and adhere to safe practices while applying or recruiting.
          </p>

          <p>
            For any issues, please contact our support team at support@orange.com. 
          </p>

          <p>
            "Connecting talent with opportunity—empowering growth for both job seekers and businesses."
          </p>

          <p>
            © 2024 EmployEase. All rights reserved. By using our services, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
