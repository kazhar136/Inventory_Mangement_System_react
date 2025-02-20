import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import './home.css'




function Home() {
    // State to store logged-in user's name
    const [loggedInUser, setLoggedInUser] = useState('');
    // State to store fetched products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Retrieve logged-in user's name from local storage
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Remove authentication data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    // Function to fetch product data from the backend
    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };

            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);

        } catch (err) {
            handleError("Failed to fetch products. Please try again.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            
            {/* Display product list */}
            <div>
                {products && products.map((item, index) => (
                    <ul key={index}>
                        <span>{item.name} : {item.price}</span>
                    </ul>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;
