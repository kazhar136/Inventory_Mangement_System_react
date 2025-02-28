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

    const [loading, setLoading] = useState(true);

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
        }, 100);
    };

    // Function to fetch product data from the backend
    const fetchProducts = async () => {
        try {
            const url = "https://inventory-mangement-system-react.onrender.com/products";
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
    
            {/* Display product list */}
             <div className="product-list">
                {loading ? (
                    <p>Loading products...</p>
                ) : products ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            
    
            <ToastContainer />
        </div>
    );
    
}

export default Home;
