import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    // Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const { name, email, password } = signupInfo;
        
        // Validate input fields
        if (!name || !email || !password) {
            return handleError('All fields are required.');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return handleError("Please enter a valid email address.");
        }

        // Password strength validation (minimum 6 characters)
        if (password.length < 6) {
            return handleError("Password must be at least 6 characters long.");
        }
        
        try {
            const response = await fetch("https://inventory-mangement-system-react.onrender.com/auth/signup", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo)
            });
            
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message || "Signup successful!");
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.error?.details?.[0]?.message || result.message || "Signup failed.");
            }
        } catch {
            handleError("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="name"
                        placeholder="Enter your name" 
                        value={signupInfo.name}
                        autoFocus
                    /> 
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email" 
                        value={signupInfo.email}
                    />    
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password" 
                        value={signupInfo.password}
                    />    
                </div>
                <button type="submit">Signup</button>
                <span>Already Have An Account? 
                    <Link to="/login"> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
