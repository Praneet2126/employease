import React from 'react';
import './Signup.css'; // Importing a custom CSS file for additional styling
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="signup-container d-flex align-items-center justify-content-center">
            <div className="signup-card p-5 shadow-lg">
                <h2 className="text-center mb-4">Create an Account</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="signupUsername" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="signupPassword" required />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                    </div>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
