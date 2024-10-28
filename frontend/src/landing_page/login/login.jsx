import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="login-card p-5 shadow-lg">
                <h2 className="text-center mb-4">Log in to Your Account</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="loginEmail" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="loginPassword" required />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    </div>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
