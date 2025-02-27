import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
    // State to store user signup details
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    // Function to handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name]= value;
        setSignupInfo(copySignupInfo);
    };
    
    // Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const { name, email, password } = signupInfo;
        
        // Validate input fields
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required.');
        }
        
        try {
            const url = "https://inventory-mangement-system-react.onrender.com/auth/signup"; // API endpoint for signup
            
            // Sending signup data to the server
            const response = await fetch(url, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo)
            });
            
            const result = await response.json();
            const { message, success, error } = result;
            
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page on success
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "Signup failed.";
                handleError(details);
            } else {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
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
                        autoFocus
                        placeholder="Enter your name" 
                        value={signupInfo.name}
                    /> 
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        autoFocus
                        placeholder="Enter your Email..." 
                        value={signupInfo.email}
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
                        value={signupInfo.password}
                    />    
                </div>
                <button type="submit">Signup</button>
                <span>Already Have An Account? 
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;