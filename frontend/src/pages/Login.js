import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import 'react-toastify/dist/ReactToastify.css';

import './Auth.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginInfo.email || !loginInfo.password) {
            return handleError("Email and password are required.");
        }

        setLoading(true);

        try {
            const response = await fetch("https://inventory-mangement-system-react.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();

            if (result.success) {
                handleSuccess(result.message);
                localStorage.setItem('token', result.jwToken);
                localStorage.setItem('loggedInUser', result.name);
                setTimeout(() => navigate('/home'), 1000);
            } else {
                handleError(result.error?.details?.[0]?.message || result.message || "Login failed.");
            }
        } catch (err) {
            handleError("An error occurred during login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        autoFocus
                        placeholder="Enter your Email..." 
                        value={loginInfo.email}
                    />    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your Password" 
                        value={loginInfo.password}
                    />    
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <span>Don't have an account? 
                    <Link to="/signup"> Sign up</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
