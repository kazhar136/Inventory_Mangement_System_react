import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
    // State to store user login details
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setLoginInfo(prevState => ({ ...prevState, [name]: value }));
    };
    
    // Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const { email, password } = loginInfo;
        
        // Validate input fields
        if (!email || !password) {
            return handleError('Email and password are required.');
        }
        
        try {
            const url = "http://localhost:8080/auth/login"; // API endpoint for login
            
            // Sending login data to the server
            const response = await fetch(url, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo)
            });
            
            const result = await response.json();
            const { message, success, jwToken,name, error } = result;
            
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwToken); // Store JWT token in local storage
                localStorage.setItem('loggedInUser', name);
               
                setTimeout(() => {
                    navigate('/home'); // Redirect to dashboard on success
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "Login failed.";
                handleError(details);
            } else {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="container">
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
                        autoFocus
                        placeholder="Enter your Password" 
                        value={loginInfo.password}
                    />    
                </div>
                <button type="submit">Login</button>
                <span>Don't have an account? 
                    <Link to="/signup">Sign up</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
