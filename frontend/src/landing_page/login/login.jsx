import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                setError(data.message || 'Failed to log in');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="login-card p-5 shadow-lg">
                <h2 className="text-center mb-4">Log in to Your Account</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <div className="d-grid mt-3">
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    </div>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
